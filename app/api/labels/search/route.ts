import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"
import prisma from "@/lib/prisma"

const labelFilterSchema = z.string().trim().min(1)

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const filterQuery = req.nextUrl.searchParams.get("q")

    let labels: any[] = []

    if (filterQuery) {
      // fts
      const filter = labelFilterSchema.parse(filterQuery)
      const query = `${filter}*`
      labels = await prisma.label.findMany({
        take: 10,
        where: {
          userId: user.id,
          name: {
            search: query,
          },
        },
      })
    } else {
      return new Response(null, { status: 400 })
    }

    return new Response(JSON.stringify(labels), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
