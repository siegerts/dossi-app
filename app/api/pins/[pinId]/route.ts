import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    pinId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const { params } = routeContextSchema.parse(context)

    // find the pin that matches the id and belongs to the user
    const pin = await prisma.pin.findFirst({
      where: {
        id: params.pinId,
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(pin), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this note.
    if (!(await verifyCurrentUserHasAccessToPin(params.pinId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the note.
    await prisma.pin.delete({
      where: {
        id: params.pinId as string,
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

async function verifyCurrentUserHasAccessToPin(pinId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.pin.count({
    where: {
      id: pinId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
