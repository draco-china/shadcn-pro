import { arrayMove } from '@dnd-kit/sortable'
import type { Row } from '@tanstack/react-table'

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
