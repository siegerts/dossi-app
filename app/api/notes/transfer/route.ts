import { NextRequest } from "next/server"
import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

const notesTransferSchema = z.object({
  title: z.string().trim().optional(),
  url: z.string().trim().url({ message: "Invalid url" }),
  from: z.string().trim(),
  to: z.string().trim(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const json = await req.json()

    const { title, url, from, to } = notesTransferSchema.parse(json)

    await prisma.entity.upsert({
      create: { url: url, title: title, userId: user.id },
      update: {},
      where: { userId_url: { userId: user.id, url } },
    })

    await prisma.note.updateMany({
      where: {
        userId: user.id,
        entityId: from,
      },
      data: {
        entityId: to,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
