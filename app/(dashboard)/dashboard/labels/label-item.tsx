"use client"

import {
  experimental_useOptimistic as useOptimistic,
  useState,
  useTransition,
} from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

export function LabelItem({ updateLabel, removeLabel, userId, label }: any) {
  const { toast } = useToast()
  let [isPending, startTransition] = useTransition()
  let [isEditing, setIsEditing] = useState(false)
  let [labelAttrs, setLabelAttrs] = useState({
    name: label.name,
    description: label.description,
  })

  const [optimisticLabel, addOptimisticLabel] = useOptimistic(
    label,
    (state, updatedLabel: any) => ({ ...state, ...updatedLabel })
  )

  const updateLabelAttrs = async () => {
    if (
      labelAttrs.name === label.name &&
      labelAttrs.description === label.description
    )
      return

    addOptimisticLabel(labelAttrs)

    updateLabel(userId, label.id, labelAttrs.name, labelAttrs.description).then(
      (res: any) => {
        if (res.error) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: res.error,
          })
        } else {
          addOptimisticLabel({
            name: label.name,
            description: label.description,
          })
        }
      }
    )
  }

  return (
    <>
      {!isEditing ? (
        <>
          <TableCell className="font-medium">{optimisticLabel.name}</TableCell>
          <TableCell className="">{optimisticLabel?.description}</TableCell>
        </>
      ) : (
        <>
          <TableCell className="font-medium">
            <Input
              type="text"
              defaultValue={optimisticLabel.name}
              onChange={(e) => {
                setLabelAttrs({
                  ...labelAttrs,
                  name: e.target.value,
                })
              }}
            />
          </TableCell>
          <TableCell className="font-medium">
            <Input
              type="text"
              defaultValue={optimisticLabel.description}
              onChange={(e) => {
                setLabelAttrs({
                  ...labelAttrs,
                  description: e.target.value,
                })
              }}
            />
          </TableCell>
        </>
      )}
      <TableCell>{label._count.entities}</TableCell>
      <TableCell className="flex-end flex items-center justify-between">
        {!isEditing ? (
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
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Icons.pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  startTransition(() => removeLabel(userId, label.id))
                }>
                <Icons.trash className="mr-2 h-3.5 w-3.5 text-red-600" />
                <span className="!hover:text-red-600 text-red-600">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => {
                setIsEditing(false)
              }}>
              cancel
              <span className="sr-only">cancel</span>
            </Button>
            <Button
              onClick={() => {
                updateLabelAttrs()
                setIsEditing(false)
              }}>
              save
              <span className="sr-only">save</span>
            </Button>
          </>
        )}
      </TableCell>
    </>
  )
}
