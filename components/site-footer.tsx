import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getUTCFullYear()} All rights reserved.
          </p>
        </div>

        {/* <ModeToggle /> */}

        <div className="flex items-center">
          <div className="mr-3 mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0">
            <Link href="/privacy">Privacy</Link>
          </div>
          <div className="mt-8 text-sm leading-5 text-gray-400 md:order-1 md:mt-0">
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
