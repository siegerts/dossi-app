import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { PricingTable } from "@/components/pricing-table"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including the enhanced dashboard.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the Professional plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> 500 Notes/month
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> 1,000 Pins
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> 200 Labels
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Enhanced Web Dashboard
            </li>
            {/* <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Webhook notifications
            </li> */}
            {/* <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Premium Support
            </li> */}
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-5xl font-bold">$15</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          Get started for Free, or unlock all features with the Professional.
        </p>
        {/* <PricingTable /> */}
      </div>
    </section>
  )
}