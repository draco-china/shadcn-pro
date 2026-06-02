'use client'

import {
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Table } from '@tanstack/react-table'

export function useColumnSettingsDrag<TData>({
  table,
  columnOrder,
}: {
  table: Table<TData>
  columnOrder: string[]
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = columnOrder.indexOf(columnId(active.id))
    const newIndex = columnOrder.indexOf(columnId(over.id))
    if (oldIndex === -1 || newIndex === -1) return
    table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
  }

  return { sensors, handleColumnDragEnd }
}

function columnId(id: UniqueIdentifier) {
  return String(id)
}
