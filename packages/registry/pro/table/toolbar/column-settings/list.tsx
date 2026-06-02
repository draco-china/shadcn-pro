'use client'

import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { Column, Table } from '@tanstack/react-table'
import { columnSettingsListClassName } from '../classes'
import { SortableColumnItem } from './item'
import { useColumnSettingsDrag } from './use-column-settings-drag'

export function ColumnSettingsList<TData>({
  table,
  columns,
  columnOrder,
  canPinColumns,
}: {
  table: Table<TData>
  columns: Column<TData, unknown>[]
  columnOrder: string[]
  canPinColumns: boolean
}) {
  const { sensors, handleColumnDragEnd } = useColumnSettingsDrag({ table, columnOrder })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleColumnDragEnd}
    >
      <SortableContext
        items={columns.map((column) => column.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className={columnSettingsListClassName}>
          {columns.map((column) => (
            <SortableColumnItem key={column.id} column={column} canPin={canPinColumns} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
