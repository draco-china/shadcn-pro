'use client'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Row } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import type { ProTableEmptyOptions } from '../types'
import { BodyRows } from './body-rows'
import { EmptyRow } from './empty-row'
import type { ProTablePinnedColumnOffsets } from './pinning'
import { ProTableSkeletonRows } from './skeleton'

export function ProTableBody<TData>({
  rows,
  rowIds,
  visibleColumns,
  visibleColumnCount,
  dragSort,
  fillEmpty,
  loading,
  loadingRows,
  paddingClass,
  empty,
  emptyFallbackText,
  pinnedOffsets,
}: {
  rows: Row<TData>[]
  rowIds: string[]
  visibleColumns: ReturnType<Row<TData>['getVisibleCells']>[number]['column'][]
  visibleColumnCount: number
  dragSort: boolean
  fillEmpty: boolean
  loading: boolean
  loadingRows: number
  paddingClass: string
  empty?: ProTableEmptyOptions
  emptyFallbackText?: ReactNode
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  if (loading) {
    return (
      <ProTableSkeletonRows
        rows={loadingRows}
        columns={visibleColumns}
        dragSort={dragSort}
        pinnedOffsets={pinnedOffsets}
      />
    )
  }

  if (dragSort) {
    return (
      <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
        <BodyRows rows={rows} dragSort paddingClass={paddingClass} pinnedOffsets={pinnedOffsets} />
        {rows.length === 0 && (
          <EmptyRow
            colSpan={visibleColumnCount}
            fill={fillEmpty}
            empty={empty}
            fallbackText={emptyFallbackText}
          />
        )}
      </SortableContext>
    )
  }

  return rows.length ? (
    <BodyRows rows={rows} paddingClass={paddingClass} pinnedOffsets={pinnedOffsets} />
  ) : (
    <EmptyRow
      colSpan={visibleColumnCount}
      fill={fillEmpty}
      empty={empty}
      fallbackText={emptyFallbackText}
    />
  )
}
