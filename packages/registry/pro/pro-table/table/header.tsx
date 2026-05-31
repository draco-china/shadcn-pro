'use client'

import { flexRender, type HeaderGroup } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { TableHead, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  getColumnAlignClassName,
  getColumnMeta,
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './utils'

export function ProTableHeader<TData>({
  headerGroups,
  dragSort,
  sticky,
  pinnedOffsets,
}: {
  headerGroups: HeaderGroup<TData>[]
  dragSort: boolean
  sticky: boolean
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {dragSort && (
            <TableHead
              className={cn(
                'sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))] transition-colors duration-150 hover:bg-muted',
                sticky && 'top-0 z-30',
              )}
            />
          )}
          {headerGroup.headers.map((header) => {
            const canSort = !dragSort && header.column.getCanSort()
            const sorted = header.column.getIsSorted()
            const sortHandler = canSort ? header.column.getToggleSortingHandler() : undefined
            const ariaSort = canSort
              ? sorted === 'asc'
                ? 'ascending'
                : sorted === 'desc'
                  ? 'descending'
                  : 'none'
              : undefined

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  sticky && 'sticky top-0 z-10 bg-background',
                  'transition-colors duration-150 hover:bg-muted',
                  getPinnedColumnClassName(
                    header.column,
                    header.column.getIsPinned() && sticky ? 'z-30' : undefined,
                  ),
                  getColumnAlignClassName(header.column, 'header'),
                  getColumnMeta(header.column)?.className,
                  canSort && 'cursor-pointer select-none',
                )}
                style={getPinnedColumnStyle(header.column, pinnedOffsets, dragSort ? 32 : 0)}
                data-pro-table-column-id={header.column.id}
                aria-sort={ariaSort}
                tabIndex={canSort ? 0 : undefined}
                onClick={sortHandler}
                onKeyDown={
                  canSort
                    ? (event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return
                        event.preventDefault()
                        sortHandler?.(event)
                      }
                    : undefined
                }
              >
                {header.isPlaceholder ? null : (
                  <div className="flex items-center gap-1.5">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {canSort && (
                      <span className="text-muted-foreground" aria-hidden="true">
                        {sorted === 'asc' ? (
                          <ArrowUp size={14} />
                        ) : sorted === 'desc' ? (
                          <ArrowDown size={14} />
                        ) : (
                          <ArrowUpDown size={14} className="opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </>
  )
}
