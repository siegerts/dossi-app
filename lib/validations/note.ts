import * as z from "zod"

export const notePatchSchema = z.object({
  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
