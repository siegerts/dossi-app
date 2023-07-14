import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"
import prisma from "@/lib/prisma"

const labelCreateSchema = z.object({
  name: z.string().trim().min(1).max(50),
  description: z.string().trim().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const labels = await prisma.label.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    return new Response(JSON.stringify(labels), { status: 200 })
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

    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPaid) {
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

    const { name, description } = labelCreateSchema.parse(json)

    const label = await prisma.label.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return new Response(JSON.stringify(label), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    console.log(error)

    return new Response(null, { status: 500 })
  }
}
