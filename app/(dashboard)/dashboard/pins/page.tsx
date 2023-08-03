import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"

import { PinItem } from "./pin-item"

export const metadata = {
  title: "Pins",
  description: "Manage pin settings.",
}

export default async function PinsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const pins = await prisma.pin.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      url: true,
      createdAt: true,
      entity: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  })

  async function removePin(userId: string, pinId: string) {
    "use server"

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          pins: {
            delete: [
              {
                id: pinId,
              },
            ],
          },
        },
      })

      revalidatePath("/dashboard/pins")
    } catch (error) {
      return {
        error: "Pin was not deleted",
      }
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pins" text="Manage saved pins." />
      {pins && pins.length === 0 && (
        <div className="my-2 flex w-full flex-col gap-y-2 rounded-md border p-3 lg:w-3/4">
          <div className="flex items-center gap-2">
            <Icons.pin className="h-5 w-5" />
            <h3 className="text-sm font-semibold">No pins yet</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <div>
              <p>
                You haven&apos;t created any pins yet. Pin an item using the
                extension to get started.
              </p>
            </div>

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
        </div>
      )}
      <form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead className="w-[300px]">Item</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pins &&
              pins.map((pin) => (
                <TableRow key={pin.id}>
                  <PinItem removePin={removePin} userId={user.id} pin={pin} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>
    </DashboardShell>
  )
}
