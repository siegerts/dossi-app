import { revalidatePath } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { labelPatchSchema } from "@/lib/validations/label"
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

import { LabelItem } from "./label-item"

export const metadata = {
  title: "Labels",
  description: "Manage label settings.",
}

export default async function LabelsPage() {
  const user = await getCurrentUser()
  //   const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const labels = await prisma.label.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: { entities: true },
      },
    },
  })

  async function removeLabel(userId: string, labelId: string) {
    "use server"

    await prisma.user.update({
      where: { id: userId },
      data: {
        labels: {
          delete: [
            {
              id: labelId,
            },
          ],
        },
      },
    })
    revalidatePath("/dashboard/labels")
  }

  async function updateLabel(
    userId: string,
    labelId: string,
    name: string,
    description: string
  ) {
    "use server"

    const result = labelPatchSchema.safeParse({
      name,
      description,
    })

    if (!result.success) {
      console.log(result.error)
      return {
        error: "Data is not the right format.",
      }
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          labels: {
            update: {
              where: {
                id: labelId,
              },
              data: {
                name,
                description,
              },
            },
          },
        },
      })
      revalidatePath("/dashboard/labels")
    } catch (error) {
      return {
        error: "Label may already exist",
      }
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Labels" text="Manage label settings." />
      {labels && labels.length === 0 && (
        <div className="my-2 flex w-full flex-col gap-y-2 rounded-md border p-3 lg:w-3/4">
          <div className="flex items-center gap-2">
            <Icons.tag className="h-5 w-5" />
            <h3 className="text-sm font-semibold">No labels yet</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <div>
              <p>
                You haven&apos;t created any labels yet. Create a label using
                the extension to get started.
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
              <TableHead className="w-[200px]">Label</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>References</TableHead>
              <TableHead className="w-[200px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {labels &&
              labels.map((label) => (
                <TableRow key={label.id}>
                  <LabelItem
                    updateLabel={updateLabel}
                    removeLabel={removeLabel}
                    userId={user.id}
                    label={label}
                  />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>
    </DashboardShell>
  )
}
