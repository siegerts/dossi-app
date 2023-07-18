import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"
import prisma from "@/lib/prisma"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const noteCreateSchema = z.object({
  content: z.string().trim(),
  title: z.string().trim().optional(),
  url: z.string().trim().url({ message: "Invalid url" }),
})

const noteFilterSchema = z.string().url({ message: "Invalid url" })

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const filterURL = req.nextUrl.searchParams.get("url")

    let notes: any[] = []

    if (!filterURL) {
      notes = await prisma.note.findMany({
        where: {
          userId: user.id,
        },
      })
    } else {
      // not my fav, but will filter for now
      const url = noteFilterSchema.parse(filterURL)
      notes = await prisma.note.findMany({
        where: {
          userId: user.id,
          url,
        },
      })
    }

    return new Response(JSON.stringify(notes), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 25 posts.
    if (!subscriptionPlan?.isPaid) {
      const count = await prisma.note.count({
        where: {
          userId: user.id,
        },
      })

      if (count >= 25) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()

    const { content, title, url } = noteCreateSchema.parse(json)

    const note = await prisma.note.create({
      data: {
        content,
        url,
        user: {
          connect: {
            id: user.id,
          },
        },
        entity: {
          connectOrCreate: {
            where: { userId_url: { userId: user.id, url } },
            create: { url: url, title: title, userId: user.id },
          },
        },
      },
    })

    return new Response(JSON.stringify(note), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
