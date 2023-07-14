import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { entitySchema } from "./data/schema"

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

      <div className="mt-5 h-full flex-1 flex-col">
        <DataTable data={entities} columns={columns} labels={labels} />
      </div>
    </>
  )
}
