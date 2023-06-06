import * as z from "zod"

export const labelPatchSchema = z.object({
  name: z.string().trim().max(50),
  description: z.string().trim().optional(),
  color: z.string().trim().optional(),
})
