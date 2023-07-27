"use client"

import { useEffect, useState } from "react"
import { Cross2Icon, DownloadIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
// @ts-ignore
import { Parser } from "json2csv"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

  const downloadSelectedRowsAsCSV = () => {
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

  const downloadSelectedRowsAsJSON = () => {
    const jsonData = JSON.stringify(
      table.getSelectedRowModel().flatRows.map((row) => row.original),
      null,
      2
    )
    const jsonBlob = new Blob([jsonData], { type: "application/json" })
    const jsonUrl = URL.createObjectURL(jsonBlob)

    let hiddenElement = document.createElement("a")
    hiddenElement.href = jsonUrl
    hiddenElement.target = "_blank"
    hiddenElement.download = "download.json"
    hiddenElement.click()
  }

  // const downloadSelectedRowsAsMarkdown = () => {
  //   let markdownData = "# My Data\n\n"
  //   const columns = table.getAllColumns().map((column) => column.id)

  //   table.getSelectedRowModel().flatRows.forEach((row, index) => {
  //     const data = row.original
  //     markdownData += `## Item ${index + 1}\n\n` // Header for each item

  //     console.log(data)

  //     for (let key in data) {
  //       if (columns.includes(key)) {
  //         markdownData += `### ${key}\n`

  //         if (Array.isArray(data[key])) {
  //           // @ts-ignore
  //           const convertToMarkdown = (item, indentation = "") => {
  //             let markdown = ""
  //             if (Array.isArray(item)) {
  //               item.forEach((arrayItem, index) => {
  //                 markdown += `${indentation}- Item ${
  //                   index + 1
  //                 }:\n${convertToMarkdown(arrayItem, indentation + "  ")}\n`
  //               })
  //             } else if (typeof item === "object" && item !== null) {
  //               for (let [key, value] of Object.entries(item)) {
  //                 markdown += `${indentation}- ${key}:\n${convertToMarkdown(
  //                   value,
  //                   indentation + "  "
  //                 )}\n`
  //               }
  //             } else {
  //               markdown += `${indentation}- ${item}\n`
  //             }
  //             return markdown
  //           }
  //           // @ts-ignore
  //           data[key].forEach((item, itemIndex) => {
  //             markdownData += `  ${itemIndex + 1}.:\n${convertToMarkdown(
  //               item,
  //               "  "
  //             )}`
  //           })
  //         } else if (typeof data[key] === "object" && data[key] !== null) {
  //           for (let subKey in data[key]) {
  //             markdownData += `  ${subKey}: ${data[key][subKey]}\n`
  //           }
  //         } else {
  //           markdownData += `${data[key]}\n\n`
  //         }
  //       }
  //     }
  //   })

  //   const markdownBlob = new Blob([markdownData], { type: "text/markdown" })
  //   const markdownUrl = URL.createObjectURL(markdownBlob)

  //   let hiddenElement = document.createElement("a")
  //   hiddenElement.href = markdownUrl
  //   hiddenElement.target = "_blank"
  //   hiddenElement.download = "download.md"
  //   hiddenElement.click()
  // }

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
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mr-2 h-8 px-2 lg:px-3">
                Download <DownloadIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-25">
              <DropdownMenuItem onClick={() => downloadSelectedRowsAsCSV()}>
                CSV (.csv)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => downloadSelectedRowsAsJSON()}>
                JSON (.json)
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={() => downloadSelectedRowsAsMarkdown()}>
                Markdown
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      <DataTableViewOptions table={table} />
    </div>
  )
}
