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
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this reminder.
    if (!(await verifyCurrentUserHasAccessToReminder(params.reminderId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the reminder.
    await prisma.reminder.delete({
      where: {
        id: params.reminderId as string,
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
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this reminder.
    if (!(await verifyCurrentUserHasAccessToReminder(params.reminderId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = reminderPatchSchema.parse(json)

    // Update the reminder date.
    await prisma.reminder.update({
      where: {
        id: params.reminderId,
      },
      data: {
        remindAt: body.at,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToReminder(reminderId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.reminder.count({
    where: {
      id: reminderId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
