import { arrayMove } from '@dnd-kit/sortable'
import type { Column, ColumnDef, ColumnPinningState, Header, Row } from '@tanstack/react-table'
import type * as React from 'react'

import { cn } from '@/lib/utils'

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

      const pinned = column.meta?.pinned
      if (!pinned) return

      const id = getColumnDefId(column, index)
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
    pinned &&
      'sticky z-10 bg-background group-data-[state=selected]:bg-muted group-hover:bg-muted/50',
    isLastLeft && 'shadow-[1px_0_0_0_hsl(var(--border))]',
    isFirstRight && 'shadow-[-1px_0_0_0_hsl(var(--border))]',
    className,
  )
}

export function getPinnedColumnStyle<TData>(column: Column<TData, unknown>): React.CSSProperties {
  const pinned = column.getIsPinned()
  const style: React.CSSProperties = {
    width: column.getSize(),
    minWidth: column.getSize(),
  }

  if (pinned === 'left') {
    style.left = `${column.getStart('left')}px`
  }

  if (pinned === 'right') {
    style.right = `${column.getAfter('right')}px`
  }

  return style
}

export function getHeaderStyle<TData>(header: Header<TData, unknown>): React.CSSProperties {
  return {
    ...getPinnedColumnStyle(header.column),
    width: header.getSize(),
    minWidth: header.getSize(),
  }
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
