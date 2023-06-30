import "@/styles/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// import { Inter as FontSans } from "next/font/google"
// import localFont from "next/font/local"

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// Font files can be colocated inside of `pages`
// const fontHeading = localFont({
//   src: "../assets/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-heading",
// })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "issue triage",
    "private notes",
    "github issue triage",
    "chrome extension",
    "browser extension",
    "github notes",
  ],
  authors: [
    {
      name: "dossi",
      url: "https://dossi.dev",
    },
  ],
  creator: "dossi",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@dossidev",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
            // fontHeading.variable
          )}>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <div className="relative flex min-h-screen flex-col">
            {/* <SiteHeader /> */}
            <div className="flex-1">
              {children}
              <Analytics />
            </div>
          </div>
          <TailwindIndicator />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </>
  )
}
