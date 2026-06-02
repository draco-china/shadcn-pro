import type { Column } from '@tanstack/react-table'
import { isProTableSystemColumnId } from '../../table/system-columns'

export function getOrderedHideableColumns<TData>(
  columns: Column<TData, unknown>[],
  columnOrder: string[],
) {
  const columnsById = new Map(columns.map((column) => [column.id, column]))
  const orderedIds = new Set<string>()
  const orderedColumns: Column<TData, unknown>[] = []

  for (const columnId of columnOrder) {
    const column = columnsById.get(columnId)
    if (column && !orderedIds.has(column.id)) {
      orderedColumns.push(column)
      orderedIds.add(column.id)
    }
  }

  for (const column of columns) {
    if (!orderedIds.has(column.id)) orderedColumns.push(column)
  }

  return orderedColumns.filter(
    (column) => column.getCanHide() && !isProTableSystemColumnId(column.id),
  )
}
