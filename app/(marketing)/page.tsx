import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// import { Features } from "@/components/landing/features"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-start gap-4 ">
          {/* <Link
            href={siteConfig.links.twitter}
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            target="_blank">
            🎉
            <div
              data-orientation="vertical"
              role="none"
              className="mx-2 h-4 w-[1px] shrink-0 bg-border"></div>
            Download the Chrome Extension
          </Link> */}

          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Enhance your open-source <br className="hidden sm:inline" />
            GitHub workflow.{" "}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Privates notes and labels across all repos, issues, and pull
            requests.
          </p>
          <div className="space-x-4">
            {/* <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link> */}
            <div className="mt-4 flex w-full flex-wrap justify-between gap-4">
              <Image
                src={"/images/chrome.png"}
                alt="chrome"
                width={100}
                height={100}
              />
              <Image
                src={"/images/brave.png"}
                alt="brave"
                width={100}
                height={100}
              />
              <Image
                src={"/images/edge.png"}
                alt="edge"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <Features /> */}
    </>
  )
}
