import { arrayMove } from '@dnd-kit/sortable'
import type { Column, ColumnDef, ColumnPinningState, Row } from '@tanstack/react-table'
import type * as React from 'react'

import { cn } from '@/lib/utils'
import type { ProTableColumnMeta } from '../types'

export const PRO_TABLE_SYSTEM_COLUMN_IDS = ['select', 'drag', 'actions', 'operation'] as const

export function getProTableSystemColumnDefaults(
  columnId: string | undefined,
): Pick<ProTableColumnMeta, 'pinned' | 'className'> | undefined {
  if (columnId === 'select' || columnId === 'drag') {
    return { pinned: 'left', className: 'w-8' }
  }
  if (columnId === 'actions' || columnId === 'operation') {
    return { pinned: 'right', className: 'w-8' }
  }
  return undefined
}

export function getColumnDefId<TData, TValue>(column: ColumnDef<TData, TValue>, index: number) {
  if (column.id) return column.id
  if ('accessorKey' in column && typeof column.accessorKey === 'string') return column.accessorKey
  return String(index)
}

export function getLeafColumnIds<TData, TValue>(columns: ColumnDef<TData, TValue>[]): string[] {
  return columns.flatMap((column, index) => {
    if ('columns' in column && Array.isArray(column.columns))
      return getLeafColumnIds(column.columns)
    return getColumnDefId(column, index)
  })
}

export function getDefaultColumnPinning<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): ColumnPinningState {
  const left: string[] = []
  const right: string[] = []

  function collect(columnDefs: ColumnDef<TData, TValue>[]) {
    columnDefs.forEach((column, index) => {
      if ('columns' in column && Array.isArray(column.columns)) {
        collect(column.columns)
        return
      }

      const id = getColumnDefId(column, index)
      const pinned = column.meta?.pinned ?? getProTableSystemColumnDefaults(id)?.pinned
      if (!pinned) return

      if (pinned === 'left') left.push(id)
      if (pinned === 'right') right.push(id)
    })
  }

  collect(columns)

  return { left, right }
}

export function getPinnedColumnClassName<TData>(
  column: Column<TData, unknown>,
  className?: string,
) {
  const pinned = column.getIsPinned()
  const isLastLeft = pinned === 'left' && column.getIsLastColumn('left')
  const isFirstRight = pinned === 'right' && column.getIsFirstColumn('right')

  return cn(
    pinned && 'sticky z-10 bg-background group-data-[state=selected]:bg-muted group-hover:bg-muted',
    isLastLeft && 'shadow-[1px_0_0_0_hsl(var(--border))]',
    isFirstRight && 'shadow-[-1px_0_0_0_hsl(var(--border))]',
    className,
  )
}

export function getColumnMeta<TData>(column: Column<TData, unknown>) {
  return column.columnDef.meta as ProTableColumnMeta<TData> | undefined
}

export function getColumnAlignClassName<TData>(
  column: Column<TData, unknown>,
  target: 'header' | 'cell',
) {
  const align = getColumnMeta(column)?.align

  if (target === 'header') {
    if (align === 'center') return 'text-center [&>div]:justify-center'
    if (align === 'right') return 'text-right [&>div]:justify-end'
    return undefined
  }

  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return undefined
}

export function getPinnedColumnStyle<TData>(
  column: Column<TData, unknown>,
  leftOffset = 0,
): React.CSSProperties {
  const pinned = column.getIsPinned()
  const columnDef = column.columnDef
  const hasExplicitSize =
    columnDef.size !== undefined ||
    columnDef.minSize !== undefined ||
    columnDef.maxSize !== undefined
  const style: React.CSSProperties = {}

  if (hasExplicitSize) {
    style.width = column.getSize()
    style.minWidth = column.getSize()
  }

  if (pinned === 'left') {
    style.left = `${column.getStart('left') + leftOffset}px`
  }

  if (pinned === 'right') {
    style.right = `${column.getAfter('right')}px`
  }

  return style
}

export function reorderDataByRows<TData>(
  data: TData[],
  rows: Row<TData>[],
  activeId: string,
  overId: string,
) {
  const oldIndex = rows.findIndex((row) => row.id === activeId)
  const newIndex = rows.findIndex((row) => row.id === overId)
  if (oldIndex === -1 || newIndex === -1) return data

  const oldDataIndex = data.indexOf(rows[oldIndex].original)
  const newDataIndex = data.indexOf(rows[newIndex].original)
  if (oldDataIndex === -1 || newDataIndex === -1) return data

  return arrayMove(data, oldDataIndex, newDataIndex)
}
