import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardHeader } from "@/components/header"
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
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pins" text="Manage saved pins." />
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
