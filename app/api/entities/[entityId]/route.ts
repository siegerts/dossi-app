import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { entityPatchSchema } from "@/lib/validations/entity"

const routeContextSchema = z.object({
  params: z.object({
    entityId: z.string(),
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
        id: params.entityId,
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Get the request body and validate it.
    const json = await req.json()
    const body = entityPatchSchema.parse(json)

    await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        entities: {
          update: {
            where: {
              id: params.entityId,
            },
            data: {
              title: body.title,
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
