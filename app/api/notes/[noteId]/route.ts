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

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this note.
    if (!(await verifyCurrentUserHasAccessTonote(params.noteId))) {
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
    if (!(await verifyCurrentUserHasAccessTonote(params.noteId))) {
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

async function verifyCurrentUserHasAccessTonote(noteId: string) {
  const session = await getServerSession(authOptions)
  const count = await prisma.note.count({
    where: {
      id: noteId,
      authorId: session?.user.id,
    },
  })

  return count > 0
}