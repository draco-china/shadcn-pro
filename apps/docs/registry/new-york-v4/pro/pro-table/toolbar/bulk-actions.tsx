"use client"

import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import type { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ProTableBulkActionsProps<TData> {
  table: Table<TData>
  children?: React.ReactNode
  entityName?: string
  className?: string
}

export function ProTableBulkActions<TData>({
  table,
  children,
  entityName = "row",
  className,
}: ProTableBulkActionsProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    if (selectedCount === 0) return

    const message = `${selectedCount} ${entityName}${selectedCount === 1 ? "" : "s"} selected. Bulk actions toolbar is available.`

    queueMicrotask(() => setAnnouncement(message))

    const timer = setTimeout(() => setAnnouncement(""), 3000)
    return () => clearTimeout(timer)
  }, [selectedCount, entityName])

  function handleClearSelection() {
    table.resetRowSelection()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const buttons = toolbarRef.current?.querySelectorAll("button")
    if (!buttons?.length) return

    const currentIndex = Array.from(buttons).indexOf(
      document.activeElement as HTMLButtonElement
    )

    switch (event.key) {
      case "ArrowRight": {
        event.preventDefault()
        buttons[(currentIndex + 1) % buttons.length]?.focus()
        break
      }
      case "ArrowLeft": {
        event.preventDefault()
        buttons[
          currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1
        ]?.focus()
        break
      }
      case "Home": {
        event.preventDefault()
        buttons[0]?.focus()
        break
      }
      case "End": {
        event.preventDefault()
        buttons[buttons.length - 1]?.focus()
        break
      }
      case "Escape": {
        const target = event.target as HTMLElement
        const activeElement = document.activeElement as HTMLElement
        const isDropdownEvent =
          target?.closest(
            '[data-slot="dropdown-menu-trigger"], [data-slot="dropdown-menu-content"]'
          ) ||
          activeElement?.closest(
            '[data-slot="dropdown-menu-trigger"], [data-slot="dropdown-menu-content"]'
          )

        if (isDropdownEvent) return

        event.preventDefault()
        handleClearSelection()
        break
      }
    }
  }

  if (selectedCount === 0) return null

  return (
    <TooltipProvider>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${selectedCount === 1 ? "" : "s"}`}
        aria-describedby="bulk-actions-description"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          "fixed bottom-6 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl transition-all delay-100 duration-300 ease-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
          className
        )}
      >
        <div className="flex items-center gap-x-2 overflow-x-auto rounded-xl border bg-background/95 p-2 shadow-xl backdrop-blur-lg supports-backdrop-filter:bg-background/60">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-6 rounded-full"
                aria-label="Clear selection"
                title="Clear selection (Escape)"
                onClick={handleClearSelection}
              >
                <X size={14} />
                <span className="sr-only">Clear selection</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear selection (Escape)</TooltipContent>
          </Tooltip>

          <Separator
            className="h-5"
            orientation="vertical"
            aria-hidden="true"
          />

          <div
            className="flex items-center gap-x-1 text-sm"
            id="bulk-actions-description"
          >
            <Badge
              variant="default"
              className="min-w-8 rounded-lg"
              aria-label={`${selectedCount} selected`}
            >
              {selectedCount}
            </Badge>{" "}
            <span className="hidden sm:inline">
              {entityName}
              {selectedCount === 1 ? "" : "s"}
            </span>{" "}
            selected
          </div>

          <Separator
            className="h-5"
            orientation="vertical"
            aria-hidden="true"
          />

          {children}
        </div>
      </div>
    </TooltipProvider>
  )
}
