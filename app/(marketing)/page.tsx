import Link from "next/link"
import { env } from "@/env.mjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Features } from "@/components/landing/features"

// async function getGitHubStars(): Promise<string | null> {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/shadcn/taxonomy",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           // Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
//         },
//         next: {
//           revalidate: 60,
//         },
//       }
//     )

//     if (!response?.ok) {
//       return null
//     }

//     const json = await response.json()

//     return parseInt(json["stargazers_count"]).toLocaleString()
//   } catch (error) {
//     return null
//   }
// }

export default async function IndexPage() {
  // const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-start gap-4 ">
          {/* <Link
            href={siteConfig.links.twitter}
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            target="_blank"
          >
            🎉
            <div
              data-orientation="vertical"
              role="none"
              className="mx-2 h-4 w-[1px] shrink-0 bg-border"
            ></div>
            Download the Chrome Extension
          </Link> */}

          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Enhanced GitHub for project <br className="hidden sm:inline" />
            maintainers and contributors.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Track your thoughts, ideas, and notes across all repositories and
            issues.
          </p>
          <div className="space-x-4">
            {/* <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link> */}
          </div>
        </div>
      </section>
      {/* <Features /> */}
    </>
  )
}
