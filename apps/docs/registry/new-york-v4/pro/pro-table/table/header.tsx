'use client'

import { flexRender, type HeaderGroup } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { TableHead, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { getHeaderStyle, getPinnedColumnClassName } from './utils'

export function ProTableHeader<TData>({
  headerGroups,
  dragSort,
  sticky,
}: {
  headerGroups: HeaderGroup<TData>[]
  dragSort: boolean
  sticky: boolean
}) {
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {dragSort && (
            <TableHead className={cn('w-8 pr-0', sticky && 'sticky top-0 z-10 bg-background')} />
          )}
          {headerGroup.headers.map((header) => {
            const canSort = !dragSort && header.column.getCanSort()
            const sorted = header.column.getIsSorted()

            return (
              <TableHead
                key={header.id}
                colSpan={header.colSpan}
                className={cn(
                  sticky && 'sticky top-0 z-10 bg-background',
                  getPinnedColumnClassName(
                    header.column,
                    header.column.getIsPinned() && sticky ? 'z-30' : undefined,
                  ),
                  canSort && 'cursor-pointer select-none',
                )}
                style={getHeaderStyle(header)}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
              >
                {header.isPlaceholder ? null : (
                  <div className="flex items-center gap-1.5">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {canSort && (
                      <span className="text-muted-foreground">
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
