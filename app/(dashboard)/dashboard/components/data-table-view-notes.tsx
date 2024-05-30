"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableViewNotes<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          view
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto sm:max-h-[600px] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-md">
            Notes for{" "}
            {row.getValue("title") ||
              row.getValue<string>("url").replace("https://github.com/", "")}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {row.getValue<any>("notes").map((note: any) => (
          <div
            key={note?.id}
            className="my-2 w-full rounded-lg border border-slate-300 px-3 py-2 !shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm text-gray-500">
                {new Intl.DateTimeFormat(navigator.language, {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(note?.createdAt))}
              </span>
            </div>

            <div className="overflow-x-auto">
              {/* @ts-ignore */}
              {/* <Remark
              //  remarkPlugins={[remarkGfm, remarkBreaks]}
              >
                {note?.content}
              </Remark> */}
              {note?.content}
            </div>
          </div>
        ))}

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
