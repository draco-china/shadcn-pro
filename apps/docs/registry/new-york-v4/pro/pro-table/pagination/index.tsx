'use client'

import type { Table } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { getPageRange } from './utils'

interface ProTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  labels?: ProTablePaginationLabels
  /** Show total row count */
  showTotal?: boolean
  /** Show quick jump input */
  showQuickJump?: boolean
}

export interface ProTablePaginationLabels {
  total?: (total: number) => React.ReactNode
  selected?: (selected: number) => React.ReactNode
  rows?: string
  rowsShort?: (total: number) => React.ReactNode
  selectedShort?: (selected: number) => React.ReactNode
  first?: string
  previous?: string
  next?: string
  last?: string
  page?: (page: number) => string
  goTo?: string
}

export function ProTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  labels,
  showTotal = true,
  showQuickJump = false,
}: ProTablePaginationProps<TData>) {
  const [jumpValue, setJumpValue] = React.useState('')
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const safePageCount = Math.max(pageCount, 1)
  const current = Math.min(pageIndex + 1, safePageCount)
  const total = table.getRowCount()
  const selected = table.getFilteredSelectedRowModel().rows.length
  const pageSize = table.getState().pagination.pageSize

  const pageRange = getPageRange(current, safePageCount)

  function handleJump(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const page = Number(jumpValue)
    if (!Number.isNaN(page) && page >= 1 && page <= safePageCount) {
      table.setPageIndex(page - 1)
    }
    setJumpValue('')
  }

  return (
    <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
      {/* Total count — hidden on very small screens */}
      <div className="text-sm text-muted-foreground shrink-0 hidden sm:block">
        {showTotal && (
          <span>
            {labels?.total ? (
              labels.total(total)
            ) : (
              <>
                Total <span className="font-medium text-foreground">{total}</span> rows
              </>
            )}
            {selected > 0 && (
              <span className="ml-2">
                ·{' '}
                {labels?.selected ? (
                  labels.selected(selected)
                ) : (
                  <>
                    <span className="font-medium text-foreground">{selected}</span> selected
                  </>
                )}
              </span>
            )}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {/* Mobile total — compact */}
        {showTotal && (
          <span className="text-xs text-muted-foreground sm:hidden">
            {labels?.rowsShort ? labels.rowsShort(total) : `${total} rows`}
            {selected > 0 && (
              <>
                {' · '}
                {labels?.selectedShort ? labels.selectedShort(selected) : `${selected} selected`}
              </>
            )}
          </span>
        )}

        {/* Page size */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground shrink-0 hidden xs:inline">
            {labels?.rows ?? 'Rows'}
          </span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => {
              table.setPageSize(Number(v))
              table.setPageIndex(0)
            }}
          >
            <SelectTrigger className="h-8 w-15 sm:w-17.5 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-1">
          {/* First / prev — always shown */}
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label={labels?.first ?? 'First page'}
          >
            <ChevronsLeft size={14} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label={labels?.previous ?? 'Previous page'}
          >
            <ChevronLeft size={14} />
          </Button>

          {/* Numbered pages — hidden on mobile, show only on sm+ */}
          <div className="hidden sm:flex items-center gap-1">
            {pageRange.map((page, i) =>
              page === '...' ? (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable
                  key={`ellipsis-${i}`}
                  className="flex size-8 items-center justify-center text-muted-foreground"
                >
                  <MoreHorizontal size={14} />
                </span>
              ) : (
                <Button
                  key={page}
                  variant={page === current ? 'default' : 'outline'}
                  size="icon"
                  className={cn('size-8', page === current && 'pointer-events-none')}
                  onClick={() => table.setPageIndex((page as number) - 1)}
                  aria-label={labels?.page?.(page as number) ?? `Page ${page}`}
                  aria-current={page === current ? 'page' : undefined}
                >
                  {page}
                </Button>
              ),
            )}
          </div>

          {/* Mobile: simple "page X / Y" indicator */}
          <span className="flex sm:hidden items-center px-2 text-sm text-muted-foreground whitespace-nowrap">
            {current} / {safePageCount}
          </span>

          {/* Next / last */}
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label={labels?.next ?? 'Next page'}
          >
            <ChevronRight size={14} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(safePageCount - 1)}
            disabled={!table.getCanNextPage()}
            aria-label={labels?.last ?? 'Last page'}
          >
            <ChevronsRight size={14} />
          </Button>
        </div>

        {/* Quick jump */}
        {showQuickJump && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground shrink-0 hidden sm:inline">
              {labels?.goTo ?? 'Go to'}
            </span>
            <input
              type="number"
              min={1}
              max={safePageCount}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              onKeyDown={handleJump}
              aria-label={labels?.goTo ?? 'Go to page'}
              className="h-8 w-14 rounded-md border border-input bg-transparent px-2 text-center text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
      </div>
    </div>
  )
}
