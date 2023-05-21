import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"
import prisma from "@/lib/prisma"

const noteCreateSchema = z.object({
  content: z.string(),
  url: z.string().url({ message: "Invalid url" }),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    // const {}
    // owner
    // repo
    // type
    // num
    // https://github.com/TanStack/query/issues/5436
    // https://github.com/TanStack/query/discussions/1098
    // https://github.com/TanStack/query/pull/5431

    const notes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(notes), { status: 200 })
  } catch (error) {
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

    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await prisma.post.count({
    //     where: {
    //       userId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()

    const { content, url } = noteCreateSchema.parse(json)

    const note = await prisma.note.create({
      data: {
        content,
        url,
        userId: user.id,
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
