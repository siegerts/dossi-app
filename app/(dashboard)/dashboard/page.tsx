import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  let notes = await prisma.note.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      url: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  notes = JSON.parse(JSON.stringify(notes))

  return (
    <div>
      <h1>Dashboard</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <p>{note.content}</p>
          <p>{note.url}</p>
          <p>{note.createdAt}</p>
        </div>
      ))}
    </div>
  )
}
