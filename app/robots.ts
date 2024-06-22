import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/uninstall", "/success-install", "/terms", "/privacy"],
    },
    sitemap: "https://dossi.dev/sitemap.xml",
  }
}
