/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  return (
    <>
      <section className="lg:pb-15 space-y-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-start gap-4 ">
          <Link
            href="https://www.xiegerts.com/post/dossi-is-now-open-source/"
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            target="_blank">
            🎉
            <div
              data-orientation="vertical"
              role="none"
              className="mx-2 h-4 w-[1px] shrink-0 bg-border"></div>
            dossi is now open source!``
          </Link>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Your own private GitHub notes
            <br className="hidden md:inline" />
            <span> </span>
            on every page.{" "}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Be more efficient with private notes and labels across all repos,
            issues, PRs, and discussions. Remember your ideas and thoughts in
            context, right where you need them.
          </p>
          <div className="flex flex-wrap gap-3 lg:space-x-4">
            <Link
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              href="https://chrome.google.com/webstore/detail/dossi/ogpcmecajeghflaaaennkmknfpeghffm">
              <div className="flex items-center">
                <Image
                  src={"/images/chrome.png"}
                  alt="dossi chrome extension"
                  width={25}
                  height={25}
                />
                <div className="ml-2">Get the Chrome Extension</div>
              </div>
            </Link>

            <Link
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              href="https://addons.mozilla.org/en-US/firefox/addon/dossi/">
              <div className="flex items-center">
                <Image
                  src={"/images/firefox.png"}
                  alt="dossi firefox extension"
                  width={25}
                  height={25}
                />
                <div className="ml-2">Get the Firefox Extension</div>
              </div>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            Also available for{" "}
            <Link href="/docs" className="underline">
              Brave and Edge
            </Link>
            .
          </div>

          <div className="my-3 flex flex-wrap gap-3 lg:space-x-4">
            <a
              href="https://www.producthunt.com/posts/dossi?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dossi"
              target="_blank"
              rel="noreferrer">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=410685&theme=light"
                alt="dossi - Your&#0032;own&#0032;private&#0032;GitHub&#0032;notes&#0032;on&#0032;every&#0032;page | Product Hunt"
                // style="width: 250px; height: 54px;"
                width="250"
                height="54"
              />
            </a>
          </div>
        </div>
      </section>
      <section
        id="video"
        className="w-100 spacing-lg mx-auto px-4 py-8 md:w-5/6 lg:w-3/4">
        <h2 className="my-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0">
          Capture thoughts in the moment with the extension.
        </h2>
        <div className="mb-10">
          <div
            className="video overflow-hidden rounded-lg shadow-xl"
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 */,
              paddingTop: 25,
              height: 0,
            }}>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              src={`https://www.youtube.com/embed/wgGGjAqa3L8`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0">
            Use the web app to manage notes, pins, and labels.
          </h2>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/dossi-dashboard.png"
              width={1000}
              height={600}
              alt="dossi popup"
              className="mt-3 rounded-md"
            />
          </div>
        </div>
      </section>
    </>
  )
}
