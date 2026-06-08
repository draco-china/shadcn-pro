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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowDown, ArrowUp, Copy, GripVertical, Plus, Trash2 } from 'lucide-react'
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'

function createArrayFieldId() {
  return `item-${Math.random().toString(36).slice(2)}`
}

export function ArrayField<TItem extends object = Record<string, unknown>>({
  value,
  onChange,
  defaultValue,
  newItem,
  renderItem,
  max,
  min = 0,
  sortable = 'button',
  disabled,
  className,
}: {
  value?: TItem[]
  onChange?: (value: TItem[]) => void
  defaultValue?: TItem[]
  newItem: () => TItem
  renderItem: (
    item: TItem,
    index: number,
    helpers: {
      update: (next: TItem | ((current: TItem) => TItem)) => void
      duplicate: () => void
      remove: () => void
      moveUp: () => void
      moveDown: () => void
    },
  ) => ReactNode
  max?: number
  min?: number
  sortable?: 'button' | 'drag' | false
  disabled?: boolean
  className?: string
}) {
  const [internalValue, setInternalValue] = useState<TItem[]>(defaultValue ?? [])
  const items = value ?? internalValue
  const [ids, setIds] = useState<string[]>(() =>
    Array.from({ length: items.length }, createArrayFieldId),
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const canAddItem = max === undefined || items.length < max
  const sortMode = sortable === false ? 'none' : sortable

  useEffect(() => {
    setIds((prev) => {
      if (prev.length === items.length) return prev
      if (items.length > prev.length) {
        return [...prev, ...Array.from({ length: items.length - prev.length }, createArrayFieldId)]
      }
      return prev.slice(0, items.length)
    })
  }, [items.length])

  function commit(next: TItem[]) {
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
  }

  function remove(index: number) {
    setIds((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
    commit([...items.slice(0, index), ...items.slice(index + 1)])
  }

  function update(index: number, next: TItem | ((current: TItem) => TItem)) {
    commit(
      items.map((item, itemIndex) => {
        if (itemIndex !== index) return item
        if (typeof next === 'function') return next(item)
        return next
      }),
    )
  }

  function duplicate(index: number) {
    setIds((prev) => [...prev.slice(0, index + 1), createArrayFieldId(), ...prev.slice(index + 1)])
    commit([...items.slice(0, index + 1), structuredClone(items[index]), ...items.slice(index + 1)])
  }

  function move(index: number, nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= items.length || index === nextIndex) return
    setIds((prev) => arrayMove(prev, index, nextIndex))
    commit(arrayMove(items, index, nextIndex))
  }

  const itemNodes = items.map((item, index) => {
    const itemContent = renderItem(item, index, {
      update: (next) => update(index, next),
      duplicate: () => duplicate(index),
      remove: () => remove(index),
      moveUp: () => move(index, index - 1),
      moveDown: () => move(index, index + 1),
    })

    const itemProps = {
      onDuplicate: () => duplicate(index),
      onRemove: () => remove(index),
      onMoveUp: () => move(index, index - 1),
      onMoveDown: () => move(index, index + 1),
      disabled,
      sortMode,
      canDuplicate: canAddItem,
      canRemove: items.length > min,
      canMoveUp: index > 0,
      canMoveDown: index < items.length - 1,
      children: itemContent,
    }

    return sortMode === 'drag' ? (
      <SortableArrayFieldItem key={ids[index]} id={ids[index]} {...itemProps} />
    ) : (
      <ArrayFieldItem key={ids[index]} {...itemProps} />
    )
  })

  return (
    <div className={cn('space-y-2', className)}>
      {sortMode === 'drag' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return

            const oldIndex = ids.indexOf(String(active.id))
            const newIndex = ids.indexOf(String(over.id))
            if (oldIndex === -1 || newIndex === -1) return

            move(oldIndex, newIndex)
          }}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {itemNodes}
          </SortableContext>
        </DndContext>
      ) : (
        itemNodes
      )}

      {canAddItem && (
        <ProButton
          variant="outline"
          disabled={disabled}
          onClick={() => {
            setIds((prev) => [...prev, createArrayFieldId()])
            commit([...items, newItem()])
          }}
          className="w-full border-dashed"
        >
          <Plus />
          Add item
        </ProButton>
      )}
    </div>
  )
}

function SortableArrayFieldItem({
  id,
  ...props
}: ArrayFieldItemProps & {
  id: string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })
  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <ArrayFieldItem
      ref={setNodeRef}
      style={style}
      dragHandleProps={{ ...attributes, ...listeners }}
      {...props}
    />
  )
}

interface ArrayFieldItemProps {
  children: ReactNode
  onDuplicate: () => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  disabled?: boolean
  sortMode: 'button' | 'drag' | 'none'
  canDuplicate?: boolean
  canRemove?: boolean
  canMoveUp?: boolean
  canMoveDown?: boolean
  ref?: (node: HTMLDivElement | null) => void
  style?: CSSProperties
  dragHandleProps?: Record<string, unknown>
}

function ArrayFieldItem({
  ref,
  style,
  children,
  onDuplicate,
  onRemove,
  onMoveUp,
  onMoveDown,
  disabled,
  sortMode,
  canDuplicate = true,
  canRemove = true,
  canMoveUp = true,
  canMoveDown = true,
  dragHandleProps,
}: ArrayFieldItemProps) {
  return (
    <div
      ref={ref}
      style={style}
      className="group relative flex items-start gap-2 rounded-md border bg-card p-3"
    >
      <div className="min-w-0 flex-1 space-y-3">{children}</div>

      {(canDuplicate || canRemove || sortMode !== 'none') && (
        <div className="mt-0.5 flex shrink-0 items-center gap-1">
          {canDuplicate && (
            <ProButton
              variant="ghost"
              size="icon-sm"
              disabled={disabled}
              onClick={onDuplicate}
              aria-label="Duplicate item"
            >
              <Copy />
            </ProButton>
          )}

          {canRemove && (
            <ProButton
              variant="ghost"
              size="icon-sm"
              disabled={disabled}
              onClick={onRemove}
              aria-label="Remove item"
            >
              <Trash2 className="text-destructive" />
            </ProButton>
          )}

          {sortMode === 'drag' && (
            <ProButton
              {...dragHandleProps}
              variant="ghost"
              size="icon-sm"
              disabled={disabled}
              className="cursor-grab active:cursor-grabbing disabled:cursor-not-allowed"
              aria-label="Drag to reorder"
            >
              <GripVertical />
            </ProButton>
          )}

          {sortMode === 'button' && (
            <>
              <ProButton
                variant="ghost"
                size="icon-sm"
                disabled={disabled || !canMoveUp}
                onClick={onMoveUp}
                aria-label="Move item up"
              >
                <ArrowUp />
              </ProButton>

              <ProButton
                variant="ghost"
                size="icon-sm"
                disabled={disabled || !canMoveDown}
                onClick={onMoveDown}
                aria-label="Move item down"
              >
                <ArrowDown />
              </ProButton>
            </>
          )}
        </div>
      )}
    </div>
  )
}
