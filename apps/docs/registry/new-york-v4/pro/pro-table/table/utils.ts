import { arrayMove } from '@dnd-kit/sortable'
import type { Column, ColumnDef, ColumnPinningState, Row, Table } from '@tanstack/react-table'
import * as React from 'react'

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
    pinned &&
      'sticky z-10 bg-background transition-colors duration-150 group-data-[state=selected]:bg-muted group-hover:bg-muted',
    isLastLeft &&
      'shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))]',
    isFirstRight &&
      'shadow-[-6px_0_10px_-10px_hsl(var(--foreground)/0.45),-1px_0_0_0_hsl(var(--border))]',
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
  const pinned = column.getIsPinned()
  const align = getColumnMeta(column)?.align ?? (pinned === 'right' ? 'right' : pinned || undefined)

  if (target === 'header') {
    if (align === 'center') return 'text-center [&>div]:justify-center'
    if (align === 'right') return 'text-right [&>div]:justify-end'
    if (align === 'left') return 'text-left [&>div]:justify-start'
    return undefined
  }

  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  if (align === 'left') return 'text-left'
  return undefined
}

export interface ProTablePinnedColumnOffsets {
  left: Record<string, number>
  right: Record<string, number>
}

export function getPinnedColumnStyle<TData>(
  column: Column<TData, unknown>,
  offsets?: ProTablePinnedColumnOffsets,
  leftOffset = 0,
): React.CSSProperties {
  const pinned = column.getIsPinned()
  const style: React.CSSProperties = {}

  if (pinned === 'left') {
    style.left = `${offsets?.left[column.id] ?? column.getStart('left') + leftOffset}px`
  }

  if (pinned === 'right') {
    style.right = `${offsets?.right[column.id] ?? column.getAfter('right')}px`
  }

  return style
}

export function useProTablePinnedColumnOffsets<TData>(
  table: Table<TData>,
  tableRef: React.RefObject<HTMLTableElement | null>,
  dragSort: boolean,
): ProTablePinnedColumnOffsets {
  const [offsets, setOffsets] = React.useState<ProTablePinnedColumnOffsets>({
    left: {},
    right: {},
  })
  const visibleColumnKey = table
    .getVisibleLeafColumns()
    .map((column) => column.id)
    .join('\0')
  const leftPinnedKey = table.getState().columnPinning.left?.join('\0') ?? ''
  const rightPinnedKey = table.getState().columnPinning.right?.join('\0') ?? ''

  React.useLayoutEffect(() => {
    const tableElement = tableRef.current
    if (!tableElement) return

    const updateOffsets = () => {
      const widths = new Map<string, number>()
      tableElement
        .querySelectorAll<HTMLElement>('[data-pro-table-column-id]')
        .forEach((element) => {
          const columnId = element.dataset.proTableColumnId
          if (!columnId || widths.has(columnId)) return
          widths.set(columnId, element.getBoundingClientRect().width)
        })

      const next: ProTablePinnedColumnOffsets = { left: {}, right: {} }
      let left = dragSort ? 32 : 0
      for (const column of table.getLeftVisibleLeafColumns()) {
        next.left[column.id] = left
        left += widths.get(column.id) ?? column.getSize()
      }

      let right = 0
      const rightColumns = table.getRightVisibleLeafColumns()
      for (let index = rightColumns.length - 1; index >= 0; index -= 1) {
        const column = rightColumns[index]
        next.right[column.id] = right
        right += widths.get(column.id) ?? column.getSize()
      }

      setOffsets((current) => (arePinnedColumnOffsetsEqual(current, next) ? current : next))
    }

    updateOffsets()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(updateOffsets)
    observer.observe(tableElement)
    tableElement.querySelectorAll<HTMLElement>('[data-pro-table-column-id]').forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [dragSort, leftPinnedKey, rightPinnedKey, table, tableRef, visibleColumnKey])

  return offsets
}

function arePinnedColumnOffsetsEqual(
  left: ProTablePinnedColumnOffsets,
  right: ProTablePinnedColumnOffsets,
) {
  return (
    areNumberRecordsEqual(left.left, right.left) && areNumberRecordsEqual(left.right, right.right)
  )
}

function areNumberRecordsEqual(left: Record<string, number>, right: Record<string, number>) {
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  if (leftKeys.length !== rightKeys.length) return false
  return leftKeys.every((key) => left[key] === right[key])
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
