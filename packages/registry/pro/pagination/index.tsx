'use client'

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontalIcon,
} from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'

export function ProPagination({
  current,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  total = 0,
  className,
}: {
  current: number
  pageCount: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  total?: number
  className?: string
}) {
  const safePageCount = Math.max(pageCount, 1)
  const currentPage = Math.min(Math.max(current, 1), safePageCount)
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= safePageCount
  const pageRange = getPaginationRange(currentPage, safePageCount)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="hidden shrink-0 text-sm text-muted-foreground sm:block">
        <span>
          Total <span className="font-medium text-foreground">{total}</span> rows
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <span className="text-xs text-muted-foreground sm:hidden">{total} rows</span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden shrink-0 text-xs text-muted-foreground xs:inline sm:text-sm">
              Rows
            </span>
            <SelectPrimitive.Root
              data-slot="pro-pagination-size-select"
              value={`${pageSize}`}
              onValueChange={(nextValue) => onPageSizeChange(Number(nextValue))}
            >
              <SelectPrimitive.Trigger
                data-slot="pro-pagination-size-trigger"
                className={
                  'flex h-8 w-15 min-w-0 items-center justify-between gap-1 rounded-md border border-input bg-transparent px-2 py-1 text-xs whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-17.5 sm:text-sm dark:bg-input/30 dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0'
                }
              >
                <SelectPrimitive.Value data-slot="pro-pagination-size-value" />
                <SelectPrimitive.Icon asChild>
                  <ChevronDownIcon className="size-4 opacity-50" />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                  data-slot="pro-pagination-size-content"
                  position="item-aligned"
                  side="top"
                  className={
                    'relative z-50 max-h-(--radix-select-content-available-height) min-w-[4rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
                  }
                >
                  <SelectPrimitive.Viewport className="p-1">
                    {[10, 20, 50, 100].map((size) => (
                      <SelectPrimitive.Item
                        key={size}
                        value={`${size}`}
                        data-slot="pro-pagination-size-item"
                        className={
                          'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                        }
                      >
                        <span
                          data-slot="pro-pagination-size-item-indicator"
                          className="absolute right-2 flex size-3.5 items-center justify-center"
                        >
                          <SelectPrimitive.ItemIndicator>
                            <CheckIcon className="size-4" />
                          </SelectPrimitive.ItemIndicator>
                        </span>
                        <SelectPrimitive.ItemText>{size}</SelectPrimitive.ItemText>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
          </div>
        )}

        <ul data-slot="pro-pagination-content" className="flex flex-row items-center gap-1">
          <li data-slot="pro-pagination-item">
            <ProButton
              aria-label="First page"
              data-slot="pro-pagination-link"
              disabled={isFirstPage}
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange(1)}
            >
              <ChevronsLeft />
            </ProButton>
          </li>
          <li data-slot="pro-pagination-item">
            <ProButton
              aria-label="Previous page"
              data-slot="pro-pagination-link"
              disabled={isFirstPage}
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </ProButton>
          </li>
          {pageRange.map((page, index) => {
            if (page === '...') {
              return (
                <li
                  data-slot="pro-pagination-item"
                  // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable
                  key={`ellipsis-${index}`}
                  className="hidden sm:block"
                >
                  <span
                    aria-hidden
                    data-slot="pro-pagination-ellipsis"
                    className="flex size-8 items-center justify-center"
                  >
                    <MoreHorizontalIcon className="size-4" />
                    <span className="sr-only">More pages</span>
                  </span>
                </li>
              )
            }

            return (
              <li data-slot="pro-pagination-item" key={page} className="hidden sm:block">
                <ProButton
                  aria-current={page === currentPage ? 'page' : undefined}
                  aria-label={`Page ${page}`}
                  data-slot="pro-pagination-link"
                  data-active={page === currentPage}
                  variant={page === currentPage ? 'outline' : 'ghost'}
                  size="icon-sm"
                  className={page === currentPage ? 'pointer-events-none' : undefined}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </ProButton>
              </li>
            )
          })}
          <li data-slot="pro-pagination-item" className="flex sm:hidden">
            <span className="px-2 text-sm text-muted-foreground whitespace-nowrap">
              {currentPage} / {safePageCount}
            </span>
          </li>
          <li data-slot="pro-pagination-item">
            <ProButton
              aria-label="Next page"
              data-slot="pro-pagination-link"
              disabled={isLastPage}
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight />
            </ProButton>
          </li>
          <li data-slot="pro-pagination-item">
            <ProButton
              aria-label="Last page"
              data-slot="pro-pagination-link"
              disabled={isLastPage}
              variant="ghost"
              size="icon-sm"
              onClick={() => onPageChange(safePageCount)}
            >
              <ChevronsRight />
            </ProButton>
          </li>
        </ul>
      </div>
    </div>
  )
}

function getPaginationRange(currentPage: number, pageCount: number) {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)
  if (currentPage <= 3) return [1, 2, 3, 4, '...', pageCount]
  if (currentPage >= pageCount - 2) {
    return [1, '...', pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount]
}
