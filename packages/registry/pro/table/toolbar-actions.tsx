'use client'

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Column, ColumnPinningState, Table } from '@tanstack/react-table'
import {
  AlignJustify,
  Check,
  GripVertical,
  Pin,
  PinOff,
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import { type ReactNode, useId } from 'react'
import { cn } from '@/lib/utils'
import { ProButton, type ProButtonSize } from '../base/button'
import { CheckboxControl } from '../base/fields/checkbox'
import { getColumnDropState, getSystemColumnPinning } from './columns'

export const TABLE_SIZE_OPTIONS = [
  { value: 'default', label: 'Comfortable' },
  { value: 'middle', label: 'Medium' },
  { value: 'compact', label: 'Compact' },
] as const

export type TableSize = (typeof TABLE_SIZE_OPTIONS)[number]['value']

export function ProTableToolbarActions<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
  actions,
  size,
  columns = true,
  density = true,
  refresh,
  disabled = false,
  tableSize = 'default',
  onTableSizeChange,
}: {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  actions?: ReactNode
  size?: ProButtonSize
  columns?: boolean
  density?: boolean
  refresh?: () => void
  disabled?: boolean
  tableSize?: TableSize
  onTableSizeChange?: (size: TableSize) => void
}) {
  const toolbarButtonSize = size ?? 'icon'

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 md:ml-auto md:shrink-0">
      {actions}
      {refresh && (
        <ProButton
          size={toolbarButtonSize}
          variant="ghost"
          tooltip="Refresh"
          disabled={disabled}
          onClick={refresh}
        >
          <RefreshCw />
        </ProButton>
      )}
      {density && onTableSizeChange && (
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <ProButton
              size={toolbarButtonSize}
              variant="ghost"
              tooltip="Density"
              disabled={disabled}
            >
              <AlignJustify />
            </ProButton>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={4}
              className={
                'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
              }
            >
              {TABLE_SIZE_OPTIONS.map((option) => (
                <DropdownMenuPrimitive.Item
                  key={option.value}
                  className={
                    'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                  }
                  onSelect={() => onTableSizeChange(option.value)}
                >
                  <Check
                    className={cn(
                      'size-4',
                      tableSize === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span>{option.label}</span>
                </DropdownMenuPrimitive.Item>
              ))}
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      )}
      {columns && (
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <ProButton
              size={toolbarButtonSize}
              variant="ghost"
              tooltip="Columns"
              disabled={disabled}
            >
              <SlidersHorizontal />
            </ProButton>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={4}
              className={
                'z-50 max-h-(--radix-dropdown-menu-content-available-height) w-[240px] min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'
              }
            >
              <ProTableColumnSettings
                table={table}
                defaultColumnOrder={defaultColumnOrder}
                defaultColumnPinning={defaultColumnPinning}
              />
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      )}
    </div>
  )
}

function ProTableColumnSettings<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
}: {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}) {
  const dragContextId = useId()
  const columns = table.getAllLeafColumns()
  const tableState = table.getState()
  const columnOrder = tableState.columnOrder.length ? tableState.columnOrder : defaultColumnOrder
  const columnLookup = new Map(columns.map((column) => [column.id, column] as const))
  const leftPinnedIds = new Set(tableState.columnPinning.left ?? [])
  const rightPinnedIds = new Set(tableState.columnPinning.right ?? [])
  const visualColumnOrder = [
    ...(tableState.columnPinning.left ?? []),
    ...columnOrder.filter(
      (columnId) => !leftPinnedIds.has(columnId) && !rightPinnedIds.has(columnId),
    ),
    ...(tableState.columnPinning.right ?? []),
  ]
  const orderedIds = new Set<string>()
  const orderedColumns = [
    ...visualColumnOrder.flatMap((columnId) => {
      const column = columnLookup.get(columnId)
      if (!column || orderedIds.has(column.id)) return []
      orderedIds.add(column.id)
      return [column]
    }),
    ...columns.filter((column) => {
      if (orderedIds.has(column.id)) return false
      orderedIds.add(column.id)
      return true
    }),
  ]
  const hideableColumns = orderedColumns.filter(
    (column) => column.getCanHide() && getSystemColumnPinning(column.id) === undefined,
  )
  const canPinColumns = table.options.enableColumnPinning !== false
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">Columns</span>
        <ProButton
          variant="ghost"
          size="xs"
          onClick={() => {
            table.resetColumnVisibility()
            table.setColumnOrder(defaultColumnOrder)
            if (canPinColumns) table.setColumnPinning(defaultColumnPinning)
          }}
        >
          <RotateCcw className="mr-1" />
          Reset
        </ProButton>
      </div>
      <div aria-hidden="true" className="h-px w-full shrink-0 bg-border" />
      <DndContext
        id={dragContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return

          const activeId = String(active.id)
          const overId = String(over.id)
          const sortableOrder = hideableColumns.map((column) => column.id)
          const targetSide = columnLookup.get(overId)?.getIsPinned()
          const next = getColumnDropState({
            columnOrder,
            sortableOrder,
            columnPinning: tableState.columnPinning,
            activeId,
            overId,
            targetSide,
            pinningEnabled: canPinColumns,
          })
          if (!next) return

          table.setColumnOrder(next.order)
          if (canPinColumns) table.setColumnPinning(next.pinning)
        }}
      >
        <SortableContext
          items={hideableColumns.map((column) => column.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="py-1">
            {hideableColumns.map((column) => (
              <SortableColumnItem key={column.id} column={column} canPin={canPinColumns} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

function SortableColumnItem<TData>({
  column,
  canPin,
}: {
  column: Column<TData, unknown>
  canPin: boolean
}) {
  const checkboxId = useId()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  })
  const pinned = column.getIsPinned()
  const canPinColumn = canPin && column.getCanPin()
  const leftPinned = pinned === 'left'
  const rightPinned = pinned === 'right'

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
      <ProButton
        variant="link"
        size="icon-xs"
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground no-underline hover:text-foreground hover:no-underline active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical />
      </ProButton>
      {canPinColumn && (
        <ProButton
          variant={leftPinned ? 'secondary' : 'ghost'}
          size="icon-xs"
          className="shrink-0"
          aria-pressed={leftPinned}
          aria-label={leftPinned ? 'Unpin left' : 'Pin left'}
          title={leftPinned ? 'Unpin left' : 'Pin left'}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            column.pin(leftPinned ? false : 'left')
          }}
        >
          {leftPinned ? <PinOff /> : <Pin />}
        </ProButton>
      )}
      <label
        htmlFor={checkboxId}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 select-none"
      >
        <CheckboxControl
          id={checkboxId}
          checked={column.getIsVisible()}
          disabled={!column.getCanHide()}
          onCheckedChange={(checked) => column.toggleVisibility(checked === true)}
          onClick={(event) => event.stopPropagation()}
        />
        <span className="truncate">
          {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
        </span>
      </label>
      {canPinColumn && (
        <ProButton
          variant={rightPinned ? 'secondary' : 'ghost'}
          size="icon-xs"
          className="shrink-0"
          aria-pressed={rightPinned}
          aria-label={rightPinned ? 'Unpin right' : 'Pin right'}
          title={rightPinned ? 'Unpin right' : 'Pin right'}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            column.pin(rightPinned ? false : 'right')
          }}
        >
          {rightPinned ? <PinOff /> : <Pin />}
        </ProButton>
      )}
    </div>
  )
}
