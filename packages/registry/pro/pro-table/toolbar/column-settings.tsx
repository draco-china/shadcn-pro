'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Column, ColumnPinningState, Table } from '@tanstack/react-table'
import { GripVertical, Pin, PinOff, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function ProTableColumnSettings<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
}: {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}) {
  const columns = table.getAllLeafColumns()
  const columnOrder = table.getState().columnOrder.length
    ? table.getState().columnOrder
    : defaultColumnOrder
  const SYSTEM_COLUMN_IDS = ['select', 'drag']
  const orderedColumns = [
    ...columnOrder.map((id) => columns.find((column) => column.id === id)).filter(Boolean),
    ...columns.filter((column) => !columnOrder.includes(column.id)),
  ].filter((column) => !SYSTEM_COLUMN_IDS.includes(column.id)) as Column<TData, unknown>[]
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = columnOrder.indexOf(active.id as string)
    const newIndex = columnOrder.indexOf(over.id as string)
    if (oldIndex === -1 || newIndex === -1) return
    table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex))
  }

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">Columns</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-1.5 text-xs"
          onClick={() => {
            table.resetColumnVisibility()
            table.setColumnOrder(defaultColumnOrder)
            table.setColumnPinning(defaultColumnPinning)
          }}
        >
          <RotateCcw size={12} className="mr-1" />
          Reset
        </Button>
      </div>
      <DropdownMenuSeparator className="my-0" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleColumnDragEnd}
      >
        <SortableContext
          items={orderedColumns.map((column) => column.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="py-1">
            {orderedColumns.map((column) => (
              <SortableColumnItem key={column.id} column={column} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

function SortableColumnItem<TData>({ column }: { column: Column<TData, unknown> }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex items-center gap-1 px-2 py-1.5 text-sm"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </button>
      <ColumnPinningToggle column={column} position="left" />
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 select-none">
        <input
          type="checkbox"
          className="accent-primary"
          checked={column.getIsVisible()}
          disabled={!column.getCanHide()}
          onChange={(event) => column.toggleVisibility(event.target.checked)}
          onClick={(event) => event.stopPropagation()}
        />
        <span className="truncate">
          {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
        </span>
      </label>
      <ColumnPinningToggle column={column} position="right" />
    </div>
  )
}

function ColumnPinningToggle<TData>({
  column,
  position,
}: {
  column: Column<TData, unknown>
  position: 'left' | 'right'
}) {
  const pinned = column.getIsPinned()
  const active = pinned === position
  const label = position === 'left' ? 'Pin left' : 'Pin right'

  return (
    <Button
      type="button"
      variant={active ? 'secondary' : 'ghost'}
      size="icon"
      className={cn('h-6 w-6 shrink-0', !active && 'text-muted-foreground')}
      aria-pressed={active}
      aria-label={active ? `Unpin ${position}` : label}
      title={active ? `Unpin ${position}` : label}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation()
        column.pin(active ? false : position)
      }}
    >
      {active ? <PinOff size={14} /> : <Pin size={14} />}
    </Button>
  )
}
