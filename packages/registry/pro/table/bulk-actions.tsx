'use client'

import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { ProButton } from '../base/button'

/** Floating keyboard-accessible actions for selected table rows. */
export function ProTableBulkActions<TData>({
  table,
  children,
}: {
  table: Table<TData>
  children?: ReactNode
}) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const descriptionId = useId()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (selectedCount === 0) return

    queueMicrotask(() =>
      setAnnouncement(
        `${selectedCount} ${selectedCount === 1 ? 'row' : 'rows'} selected. Bulk actions toolbar is available.`,
      ),
    )

    const timer = setTimeout(() => setAnnouncement(''), 3000)
    return () => clearTimeout(timer)
  }, [selectedCount])

  function handleKeyDown(event: KeyboardEvent) {
    const buttons = toolbarRef.current?.querySelectorAll('button')
    if (!buttons?.length) return

    const activeElement = document.activeElement
    const currentIndex =
      activeElement instanceof HTMLButtonElement ? Array.from(buttons).indexOf(activeElement) : -1

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        buttons[(currentIndex + 1) % buttons.length]?.focus()
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        buttons[currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1]?.focus()
        break
      }
      case 'Home': {
        event.preventDefault()
        buttons[0]?.focus()
        break
      }
      case 'End': {
        event.preventDefault()
        buttons[buttons.length - 1]?.focus()
        break
      }
      case 'Escape': {
        const target = event.target instanceof HTMLElement ? event.target : null
        const dropdownSelector =
          '[data-slot="dropdown-menu-trigger"], [data-slot="dropdown-menu-content"]'

        if (
          target?.closest(dropdownSelector) ||
          (activeElement instanceof HTMLElement && activeElement.closest(dropdownSelector))
        ) {
          return
        }

        event.preventDefault()
        table.resetRowSelection()
        break
      }
    }
  }

  if (selectedCount === 0) return null

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${selectedCount === 1 ? 'row' : 'rows'}`}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="fixed bottom-6 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl transition-transform delay-100 duration-300 ease-out hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <div className="flex items-center gap-x-2 overflow-x-auto rounded-xl border bg-background/95 p-2 shadow-xl backdrop-blur-lg supports-backdrop-filter:bg-background/60">
          <ProButton
            variant="outline"
            className="rounded-full"
            title="Clear selection (Escape)"
            tooltip="Clear selection (Escape)"
            onClick={() => table.resetRowSelection()}
          >
            <X />
          </ProButton>

          <div aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />

          <div className="flex items-center gap-x-1 text-sm" id={descriptionId}>
            <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {selectedCount}
            </span>
            <span className="hidden sm:inline">{selectedCount === 1 ? 'row' : 'rows'}</span>
            selected
          </div>

          {children != null && (
            <>
              <div aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
              {children}
            </>
          )}
        </div>
      </div>
    </>
  )
}
