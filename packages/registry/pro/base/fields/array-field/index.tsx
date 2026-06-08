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
import { Copy, GripVertical, Plus, Trash2 } from 'lucide-react'
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
    },
  ) => ReactNode
  max?: number
  min?: number
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

  return (
    <div className={cn('space-y-2', className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) return

          const oldIndex = ids.indexOf(String(active.id))
          const newIndex = ids.indexOf(String(over.id))
          if (oldIndex === -1 || newIndex === -1) return

          setIds((prev) => arrayMove(prev, oldIndex, newIndex))
          commit(arrayMove(items, oldIndex, newIndex))
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={ids[index]}
              id={ids[index]}
              onDuplicate={() => duplicate(index)}
              onRemove={() => remove(index)}
              disabled={disabled}
              canDuplicate={canAddItem}
              canRemove={items.length > min}
            >
              {renderItem(item, index, {
                update: (next) => update(index, next),
                duplicate: () => duplicate(index),
                remove: () => remove(index),
              })}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      {canAddItem && (
        <ProButton
          variant="outline"
          disabled={disabled}
          onClick={() => {
            setIds((prev) => [...prev, createArrayFieldId()])
            commit([...items, newItem()])
          }}
          className="w-full border-dashed text-muted-foreground hover:text-foreground"
        >
          <Plus className="size-4" />
          Add item
        </ProButton>
      )}
    </div>
  )
}

function SortableItem({
  id,
  children,
  onDuplicate,
  onRemove,
  disabled,
  canDuplicate = true,
  canRemove = true,
}: {
  id: string
  children: ReactNode
  onDuplicate: () => void
  onRemove: () => void
  disabled?: boolean
  canDuplicate?: boolean
  canRemove?: boolean
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
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex items-start gap-2 rounded-md border bg-card p-3"
    >
      <ProButton
        {...attributes}
        {...listeners}
        variant="ghost"
        size="icon-sm"
        disabled={disabled}
        className={
          'mt-1 cursor-grab text-muted-foreground active:cursor-grabbing disabled:cursor-not-allowed'
        }
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </ProButton>

      <div className="min-w-0 flex-1 space-y-3">{children}</div>

      {canDuplicate && (
        <ProButton
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          onClick={onDuplicate}
          aria-label="Duplicate item"
        >
          <Copy className="size-3.5" />
        </ProButton>
      )}

      {canRemove && (
        <ProButton
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          className="shrink-0 text-destructive/60 hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
          aria-label="Remove item"
        >
          <Trash2 className="size-3.5" />
        </ProButton>
      )}
    </div>
  )
}
