import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

// urls could possibly have a trailing
// slash, so we need to remove it
const entityFilterSchema = z
  .string()
  .trim()
  .url({ message: "Invalid url" })
  .transform((url) => (url.endsWith("/") ? url.slice(0, -1) : url))

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const filterURL = req.nextUrl.searchParams.get("url")

    if (!filterURL) {
      let entities = await prisma.entity.findMany({
        where: {
          userId: user.id,
        },
      })
      return new Response(JSON.stringify(entities), { status: 200 })
    } else {
      // not my fav, but will filter for now
      const url = entityFilterSchema.parse(filterURL)
      let entity = await prisma.entity.findFirst({
        where: {
          userId: user.id,
          url,
        },
        select: {
          id: true,
          title: true,
          url: true,
          createdAt: true,
          updatedAt: true,
          notes: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          pins: {
            select: {
              id: true,
            },
          },
          labels: {
            select: {
              label: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                },
              },
            },
          },
        },
      })
      return new Response(JSON.stringify(entity), { status: 200 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
