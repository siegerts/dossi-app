import * as z from "zod"

export const entityPatchSchema = z.object({
  title: z.string().max(500).trim().optional(),
})
