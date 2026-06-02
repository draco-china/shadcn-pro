'use client'

import {
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Table } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction, useCallback } from 'react'
import { reorderDataByRows } from '../table/drag-sort'
import type { ProTableDragSortOptions } from '../types'

export function useProTableDragSort<TData>({
  data,
  dragSort,
  setData,
  table,
}: {
  data: TData[]
  dragSort?: false | ProTableDragSortOptions<TData>
  setData: Dispatch<SetStateAction<TData[]>>
  table: Table<TData>
}) {
  const enabled = dragSort !== false && dragSort !== undefined
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const nextData = reorderDataByRows(
        data,
        table.getRowModel().rows,
        String(active.id),
        String(over.id),
      )
      if (nextData === data) return

      setData(nextData)
      if (dragSort) dragSort.onDragSortEnd?.(nextData)
    },
    [data, dragSort, setData, table],
  )

  return { enabled, sensors, handleDragEnd }
}
