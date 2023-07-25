import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.dossi.dev",
      lastModified: new Date(),
    },
    {
      url: "https://www.dossi.dev/why-dossi",
      lastModified: new Date(),
    },
    {
      url: "https://www.dossi.dev/pricing",
      lastModified: new Date(),
    },
    {
      url: "https://www.dossi.dev/docs",
      lastModified: new Date(),
    },
  ]
}
