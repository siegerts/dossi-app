"use client"

import { useEffect, useState } from "react"
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
// @ts-ignore
import { Parser } from "json2csv"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  labels: { id: string; name: string; _count: { entities: number } }[]
}

export function DataTableToolbar<TData>({
  table,
  labels,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const labelOptions = labels.map((label) => ({
    label: label.name,
    value: label.name,
    count: label._count.entities,
    id: label.id,
  }))

  const downloadSelectedRows = () => {
    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(
      table.getSelectedRowModel().flatRows.map((row) => row.original)
    )
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const csvUrl = URL.createObjectURL(csvData)

    let hiddenElement = document.createElement("a")
    hiddenElement.href = csvUrl
    hiddenElement.target = "_blank"
    hiddenElement.download = "download.csv"
    hiddenElement.click()
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          className="h-8 w-[150px] lg:w-[300px]"
        />
        {table.getColumn("labels") && (
          <DataTableFacetedFilter
            column={table.getColumn("labels")}
            title="labels"
            options={labelOptions}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {table.getSelectedRowModel().flatRows.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => downloadSelectedRows()}
          className="mr-2 h-8 px-2 lg:px-3">
          Download
          <DownloadIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}
