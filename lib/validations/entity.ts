import * as z from "zod"

const urlSchema = z
  .string()
  .url({ message: "Invalid url" })
  .refine(
    (value) => {
      try {
        const url = new URL(value)
        const host = url.hostname
        return host === "github.com" || host.endsWith(".github.com")
      } catch {
        return false
      }
    },
    {
      message:
        "URL's hostname must be a subdomain of github.com or github.com itself",
    }
  )

export const entityPatchSchema = z
  .object({
    title: z.string().max(500).trim().optional(),
    url: urlSchema.optional(),
  })
  .refine((data) => Boolean(data.title) || Boolean(data.url), {
    message: "Either 'title' or 'url' must be provided",
  })
