import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { reminderPatchSchema } from "@/lib/validations/reminder"

const routeContextSchema = z.object({
  params: z.object({
    reminderId: z.string(),
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

    // find the reminder that matches the id and belongs to the user
    const reminder = await prisma.reminder.findFirst({
      where: {
        id: params.reminderId,
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(reminder), { status: 200 })
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
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        reminders: {
          delete: [
            {
              id: params.reminderId,
            },
          ],
        },
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  // check for session sooner
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Get the request body and validate it.
    const json = await req.json()
    const body = reminderPatchSchema.parse(json)

    await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        reminders: {
          update: {
            where: {
              id: params.reminderId,
            },
            data: {
              remindAt: body.at,
            },
          },
        },
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
