import * as z from "zod"

export const reminderPatchSchema = z.object({
  at: z.string().datetime(),
})
