import type { ColumnDef, ColumnPinningState } from '@tanstack/react-table'
import { getProTableSystemColumnDefaults } from './system-columns'

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
  return {
    left: getPinnedColumnIds(columns, 'left'),
    right: getPinnedColumnIds(columns, 'right'),
  }
}

function getPinnedColumnIds<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  side: 'left' | 'right',
): string[] {
  return columns.flatMap((column, index) => {
    if ('columns' in column && Array.isArray(column.columns)) {
      return getPinnedColumnIds(column.columns, side)
    }

    const id = getColumnDefId(column, index)
    const pinned = column.meta?.pinned ?? getProTableSystemColumnDefaults(id)?.pinned
    return pinned === side ? [id] : []
  })
}
