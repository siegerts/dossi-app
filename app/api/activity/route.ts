import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    let activity = await prisma.note.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
        userId: user.id,
      },
      select: {
        id: true,
        createdAt: true,
        entity: {
          select: {
            url: true,
            title: true,
          },
        },
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    })

    return new Response(JSON.stringify(activity), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
