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
      select: {
        id: true,
        url: true,
        entity: {
          select: {
            title: true,
          },
        },
        createdAt: true,
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

    const { url } = pinCreateSchema.parse(json)

    let pin
    try {
      pin = await prisma.pin.create({
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
    } catch (error: any) {
      if (error?.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new pin cannot be created with this URL and user ID"
        )
      }
      return new Response(null, { status: 400 })
    }

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
