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
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ArrayFieldProps<TItem = unknown> {
  /** Controlled value */
  value?: TItem[]
  /** Called with the new array on any change */
  onChange?: (value: TItem[]) => void
  /** Default value for uncontrolled usage */
  defaultValue?: TItem[]
  /** Factory for a blank new item */
  newItem?: () => TItem
  /** Render the editable content of each item */
  renderItem: (
    item: TItem,
    index: number,
    helpers: {
      update: (patch: Partial<TItem extends object ? TItem : never>) => void
      remove: () => void
    },
  ) => React.ReactNode
  /** Label for the Add button */
  addText?: React.ReactNode
  /** Maximum number of items (Add button hidden when reached) */
  max?: number
  /** Minimum number of items (Remove button hidden when at min) */
  min?: number
  disabled?: boolean
  className?: string
}

interface SortableItemProps {
  id: string
  children: React.ReactNode
  onRemove: () => void
  disabled?: boolean
  canRemove?: boolean
}

function SortableItem({ id, children, onRemove, disabled, canRemove = true }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="group relative flex items-start gap-2 rounded-md border bg-card p-3"
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        className="mt-1 cursor-grab text-muted-foreground active:cursor-grabbing disabled:cursor-not-allowed"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-3">{children}</div>

      {/* Remove */}
      {canRemove && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          className="size-7 shrink-0 text-destructive/60 hover:text-destructive"
          onClick={onRemove}
          aria-label="Remove item"
        >
          <Trash2 className="size-3.5" />
        </Button>
      )}
    </div>
  )
}

export function ArrayField<TItem = unknown>({
  value: valueProp,
  onChange,
  defaultValue,
  newItem,
  renderItem,
  addText = 'Add item',
  max,
  min = 0,
  disabled,
  className,
}: ArrayFieldProps<TItem>) {
  // Uncontrolled state fallback
  const [internalValue, setInternalValue] = React.useState<TItem[]>(defaultValue ?? [])
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const [ids, setIds] = React.useState<string[]>(() =>
    value.map((_, i) => `item-${i}-${Math.random().toString(36).slice(2)}`),
  )

  // Keep ids in sync when value length changes externally
  React.useEffect(() => {
    setIds((prev) => {
      if (prev.length === value.length) return prev
      if (value.length > prev.length) {
        return [
          ...prev,
          ...Array.from(
            { length: value.length - prev.length },
            () => `item-${Math.random().toString(36).slice(2)}`,
          ),
        ]
      }
      return prev.slice(0, value.length)
    })
  }, [value.length])

  function commit(next: TItem[]) {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  function handleAdd() {
    const item = newItem ? newItem() : ('' as TItem)
    const next = [...value, item]
    const newId = `item-${Math.random().toString(36).slice(2)}`
    setIds((prev) => [...prev, newId])
    commit(next)
  }

  function handleRemove(index: number) {
    commit(value.filter((_, i) => i !== index))
    setIds((prev) => prev.filter((_, i) => i !== index))
  }

  function handleUpdate(index: number, patch: object) {
    commit(
      value.map((item, i) => (i === index ? { ...(item as object), ...patch } : item)) as TItem[],
    )
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = ids.indexOf(active.id as string)
    const newIndex = ids.indexOf(over.id as string)
    if (oldIndex === -1 || newIndex === -1) return
    const nextIds = arrayMove(ids, oldIndex, newIndex)
    const nextValue = arrayMove(value, oldIndex, newIndex)
    setIds(nextIds)
    commit(nextValue)
  }

  const atMax = max !== undefined && value.length >= max
  const atMin = value.length <= min

  return (
    <div className={cn('space-y-2', className)}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {value.map((item, index) => (
            <SortableItem
              key={ids[index]}
              id={ids[index]}
              onRemove={() => handleRemove(index)}
              disabled={disabled}
              canRemove={!atMin}
            >
              {renderItem(item, index, {
                update: (patch) => handleUpdate(index, patch as object),
                remove: () => handleRemove(index),
              })}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      {!atMax && (
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={handleAdd}
          className="w-full border-dashed text-muted-foreground hover:text-foreground"
        >
          <Plus className="mr-2 size-4" />
          {addText}
        </Button>
      )}
    </div>
  )
}

ArrayField.displayName = 'ArrayField'
