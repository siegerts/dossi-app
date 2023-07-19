import * as z from "zod"

import { entityUrlSchema } from "@/lib/validations/entity"

export const notePatchSchema = z.object({
  // TODO: Type this properly from editorjs block types?
  content: z.string().trim().optional(),
})

export const noteCreateSchema = z.object({
  content: z.string().trim(),
  title: z.string().trim().optional(),
  url: entityUrlSchema,
})
