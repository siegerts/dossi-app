import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

export const metadata = {
  title: "Notes Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  let labels = await prisma.label.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: { entities: true },
      },
    },
  })

  let entities = await prisma.entity.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      url: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      notes: {
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      },
      labels: {
        select: {
          label: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  entities = JSON.parse(JSON.stringify(entities))
  labels = JSON.parse(JSON.stringify(labels))

  return (
    <>
      <div className="mb-3">
        <DashboardHeader heading="Dashboard" text="" />
      </div>

      {entities && entities.length === 0 && (
        <div className="my-2 flex w-full flex-col gap-y-2 rounded-md border p-3 lg:w-3/4">
          <div className="flex items-center gap-2">
            <Icons.post className="h-5 w-5" />
            <h3 className="text-sm font-semibold">No notes or items yet</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <div>
              <p>
                You haven&apos;t created any notes yet. Create an item by
                creating a note or pin using the extension.
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
          </div>
        </div>
      )}

      <div className="mt-5 h-full flex-1 flex-col p-2">
        {/* @ts-ignore */}
        <DataTable data={entities} columns={columns} labels={labels} />
      </div>
    </>
  )
}
