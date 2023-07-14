"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell } from "@/components/ui/table"
import { Icons } from "@/components/icons"

export function PinItem({ removePin, userId, pin }: any) {
  let [isPending, startTransition] = useTransition()

  return (
    <>
      <>
        <TableCell className="font-medium">{pin?.entity?.title}</TableCell>
        <TableCell className="">{pin.url}</TableCell>
      </>

      <TableCell className="flex-end flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
              <Icons.ellipsisH className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              onClick={() => startTransition(() => removePin(userId, pin.id))}
              className="text-red-600 hover:text-red-600">
              <Icons.trash className="mr-2 h-3.5 w-3.5 text-red-600" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  )
}