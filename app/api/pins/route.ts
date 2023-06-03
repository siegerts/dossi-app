import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { RequiresProPlanError } from "@/lib/exceptions"
import prisma from "@/lib/prisma"

const pinCreateSchema = z.object({
  url: z.string().url({ message: "Invalid url" }),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const pins = await prisma.pin.findMany({
      where: {
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(pins), { status: 200 })
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

    const { url } = pinCreateSchema.parse(json)

    // TODO: here
    // const pin = await prisma.pin.create({
    //   data: {
    //     url,
    //     userId: user.id,
    //   },
    // })

    const pin = await prisma.pin.create({
      data: {
        url,
        user: {
          connect: {
            id: user.id,
          },
        },
        entity: {
          connectOrCreate: {
            where: { userId_url: { userId: user.id, url } },
            create: { url: url, userId: user.id },
          },
        },
      },
    })

    return new Response(JSON.stringify(pin), { status: 201 })
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
