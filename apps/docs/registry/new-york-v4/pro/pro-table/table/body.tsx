'use client'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { flexRender, type Row } from '@tanstack/react-table'
import type * as React from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { AutoFilterCell } from '../toolbar'
import { ProTableEmptyState } from './empty-state'
import { ProTableSkeletonRows } from './skeleton'
import { SortableRow } from './sortable-row'
import {
  getColumnAlignClassName,
  getColumnMeta,
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './utils'

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
  emptyIcon,
  emptyText,
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
  emptyIcon?: React.ReactNode
  emptyText?: React.ReactNode
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
            icon={emptyIcon}
            text={emptyText}
          />
        )}
      </SortableContext>
    )
  }

  return rows.length ? (
    <BodyRows rows={rows} paddingClass={paddingClass} pinnedOffsets={pinnedOffsets} />
  ) : (
    <EmptyRow colSpan={visibleColumnCount} fill={fillEmpty} icon={emptyIcon} text={emptyText} />
  )
}

function BodyRows<TData>({
  rows,
  dragSort,
  paddingClass,
  pinnedOffsets,
}: {
  rows: Row<TData>[]
  dragSort?: boolean
  paddingClass: string
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  return (
    <>
      {rows.map((row) => {
        const cells = row.getVisibleCells().map((cell) => {
          const meta = cell.column.columnDef.meta as
            | {
                filter?: {
                  options: { label: string; value: string }[]
                  variant?: 'badge' | 'text'
                }
              }
            | undefined
          const filter = meta?.filter
          const autoRender = filter && cell.column.columnDef.cell === undefined

          return (
            <TableCell
              key={cell.id}
              className={getPinnedColumnClassName(
                cell.column,
                cn(
                  paddingClass,
                  getColumnAlignClassName(cell.column, 'cell'),
                  getColumnMeta(cell.column)?.className,
                ),
              )}
              style={getPinnedColumnStyle(cell.column, pinnedOffsets, dragSort ? 32 : 0)}
              data-pro-table-column-id={cell.column.id}
            >
              {autoRender ? (
                <AutoFilterCell
                  value={cell.getValue() as string}
                  options={filter.options}
                  variant={filter.variant}
                />
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </TableCell>
          )
        })

        return dragSort ? (
          <SortableRow key={row.id} row={row} paddingClass={paddingClass}>
            {cells}
          </SortableRow>
        ) : (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="group transition-colors duration-150 hover:bg-muted data-[state=selected]:bg-muted"
          >
            {cells}
          </TableRow>
        )
      })}
    </>
  )
}

function EmptyRow({
  colSpan,
  fill,
  icon,
  text,
}: {
  colSpan: number
  fill: boolean
  icon?: React.ReactNode
  text?: React.ReactNode
}) {
  return (
    <TableRow className={fill ? 'h-full' : undefined}>
      <TableCell
        colSpan={colSpan}
        className={cn('h-32 text-center text-muted-foreground', fill && 'h-full')}
      >
        <ProTableEmptyState icon={icon} text={text} />
      </TableCell>
    </TableRow>
  )
}
