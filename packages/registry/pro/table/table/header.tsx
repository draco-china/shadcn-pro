'use client'

import type { HeaderGroup } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { tableHeaderDragCellClassName, tableHeaderDragStickyClassName } from './classes'
import { ProTableHeadCell, ProTableRowElement } from './elements'
import { ProTableHeaderCell } from './header-cell'
import type { ProTablePinnedColumnOffsets } from './pinning'

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
        <ProTableRowElement key={headerGroup.id}>
          {dragSort && (
            <ProTableHeadCell
              className={cn(tableHeaderDragCellClassName, sticky && tableHeaderDragStickyClassName)}
            />
          )}
          {headerGroup.headers.map((header) => (
            <ProTableHeaderCell
              key={header.id}
              header={header}
              dragSort={dragSort}
              sticky={sticky}
              pinnedOffsets={pinnedOffsets}
            />
          ))}
        </ProTableRowElement>
      ))}
    </>
  )
}
