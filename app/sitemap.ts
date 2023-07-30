import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dossi.dev",
      lastModified: new Date(),
    },
    {
      url: "https://dossi.dev/why-dossi",
      lastModified: new Date(),
    },
    {
      url: "https://dossi.dev/pricing",
      lastModified: new Date(),
    },
    {
      url: "https://dossi.dev/docs",
      lastModified: new Date(),
    },
  ]
}
