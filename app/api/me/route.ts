import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"

import { freePlan, proPlan } from "@/config/subscriptions"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const account = await prisma.user.findFirst({
      where: {
        id: user?.id,
      },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
        _count: {
          select: {
            notes: true,
            labels: true,
            pins: true,
          },
        },
      },
    })

    if (!account) {
      throw new Error("User not found")
    }

    // Check if user is on a paid plan.
    const isPaid =
      account?.stripePriceId &&
      // @ts-ignore
      account?.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

    const plan = isPaid ? proPlan : freePlan

    const counts = {
      notes: account._count.notes,
      labels: account._count.labels,
      pins: account._count.pins,
    }

    return new Response(JSON.stringify({ plan: plan.name, counts }), {
      status: 200,
    })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
