import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-start gap-4 ">
          {/* <Link
            href="https://chrome.google.com/webstore/detail/dossi/ogpcmecajeghflaaaennkmknfpeghffm"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            target="_blank">
            🎉
            <div
              data-orientation="vertical"
              role="none"
              className="mx-2 h-4 w-[1px] shrink-0 bg-border"></div>
            Download the Free Chrome Extension
          </Link> */}

          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Your own private GitHub notes
            <br />
            on every page.{" "}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Private notes and labels across all repos, issues, PRs, and
            discussions. Remember your ideas and thoughts in context, right
            where you need them.
          </p>
          <div className="flex flex-wrap gap-3 lg:space-x-4">
            <Link
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              href="https://chrome.google.com/webstore/detail/dossi/ogpcmecajeghflaaaennkmknfpeghffm">
              <div className="flex items-center">
                <Image
                  src={"/images/chrome.png"}
                  alt="chrome"
                  width={25}
                  height={25}
                />
                <div className="ml-2">Get the Chrome Extension</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
