"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const deleteEntity = async () => {
    // alert the user
    const confirm = window.confirm(
      "Are you sure you want to delete this item? All of its data, including notes, will be permanently deleted."
    )
    // @ts-ignore
    if (!confirm) return

    // @ts-ignore
    const resp = await fetch(`/api/entities/${row.original?.id}`, {
      method: "DELETE",
    })

    if (resp.ok) {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {/* <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator /> */}

        <DropdownMenuItem onClick={() => deleteEntity()}>
          <Icons.trash className="mr-2 h-3.5 w-3.5 text-red-600" />
          <span className="!hover:text-red-600 text-red-600">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
