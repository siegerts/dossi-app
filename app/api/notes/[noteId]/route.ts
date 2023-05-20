import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { notePatchSchema } from "@/lib/validations/note"

const routeContextSchema = z.object({
  params: z.object({
    noteId: z.string(),
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

    // find the note that matches the id and belongs to the user
    const note = await prisma.note.findFirst({
      where: {
        id: params.noteId,
        userId: user.id,
      },
    })

    return new Response(JSON.stringify(note), { status: 200 })
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
    if (!(await verifyCurrentUserHasAccessToNote(params.noteId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the note.
    await prisma.note.delete({
      where: {
        id: params.noteId as string,
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

    // Check if the user has access to this note.
    if (!(await verifyCurrentUserHasAccessToNote(params.noteId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = notePatchSchema.parse(json)

    // Update the note.
    // TODO: Implement sanitization for content.
    await prisma.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        content: body.content,
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

async function verifyCurrentUserHasAccessToNote(noteId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.note.count({
    where: {
      id: noteId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
