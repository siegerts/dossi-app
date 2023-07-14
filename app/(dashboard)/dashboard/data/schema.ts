import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const entitySchema = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  notes: z
    .array(
      z.object({
        id: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .optional(),
  labels: z
    .array(
      z.object({
        label: z.object({
          id: z.string().optional(),
          name: z.string().optional(),
        }),
      })
    )
    .optional(),
})

export type Entity = z.infer<typeof entitySchema>
