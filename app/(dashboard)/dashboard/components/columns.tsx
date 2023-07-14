"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { Entity } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Entity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "url",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: ({ row }) => (
      <div className="w-[300px] truncate font-medium">
        <Link href={row.getValue("url")}>
          {row.getValue("url").replace("https://github.com/", "")}
        </Link>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Intl.DateTimeFormat(navigator.language, {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(row.getValue("createdAt")))}
          </span>
        </div>
      )
    },
    enableHiding: true,
  },
  {
    accessorKey: "updatedAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]">
            {new Intl.DateTimeFormat(navigator.language, {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(row.getValue("updatedAt")))}
          </span>
        </div>
      )
    },
    enableHiding: true,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <div className="w-[50px] ">{row.getValue("notes").length}</div>
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <div className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: "labels",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Labels" />
    ),
    cell: ({ row }) => {
      const labels: any = row.getValue("labels")

      if (labels.length === 0) {
        return null
      }

      return (
        <div className="flex w-[150px] flex-wrap items-center">
          {labels.map((label: any) => (
            <div
              key={label.label.id}
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "my-1 mr-1 rounded-md"
              )}>
              {label.label.name}
            </div>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const labels: any = row.getValue(id)
      // return labels.every((label: any) => value.some(label.label.name))
      return value.every((val: any) =>
        labels.some((label: any) => label.label.name === val)
      )

      // ['feature-request-1'].includes()
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
