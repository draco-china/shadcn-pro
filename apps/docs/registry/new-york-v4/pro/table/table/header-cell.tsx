'use client'

import { flexRender, type Header } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  tableHeaderContentClassName,
  tableHeaderHoverCellClassName,
  tableHeaderStickyCellClassName,
} from './classes'
import { getColumnAlignClassName, getColumnMeta } from './column-align'
import { ProTableHeadCell } from './elements'
import {
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './pinning'
import { ProTableSortIndicator } from './sort-indicator'

export function ProTableHeaderCell<TData>({
  header,
  dragSort,
  sticky,
  pinnedOffsets,
}: {
  header: Header<TData, unknown>
  dragSort: boolean
  sticky: boolean
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  const canSort = !dragSort && header.column.getCanSort()
  const sorted = header.column.getIsSorted()
  const sortHandler = canSort ? header.column.getToggleSortingHandler() : undefined

  return (
    <ProTableHeadCell
      colSpan={header.colSpan}
      className={cn(
        sticky && tableHeaderStickyCellClassName,
        tableHeaderHoverCellClassName,
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
      aria-sort={getAriaSort(canSort, sorted)}
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
        <div className={tableHeaderContentClassName}>
          {flexRender(header.column.columnDef.header, header.getContext())}
          {canSort && <ProTableSortIndicator sorted={sorted} />}
        </div>
      )}
    </ProTableHeadCell>
  )
}

function getAriaSort(canSort: boolean, sorted: false | 'asc' | 'desc') {
  if (!canSort) return undefined
  if (sorted === 'asc') return 'ascending'
  if (sorted === 'desc') return 'descending'
  return 'none'
}
