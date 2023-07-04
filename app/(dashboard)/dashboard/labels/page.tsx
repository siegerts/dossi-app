import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { labelPatchSchema } from "@/lib/validations/label"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { LabelItem } from "./label-item"

export const metadata = {
  title: "Labels",
  description: "Manage label settings.",
}

export default async function BillingPage() {
  const user = await getCurrentUser()
  //   const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

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
        error: "Schema validation error",
      }
    }

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
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Labels" text="Manage label settings." />
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
