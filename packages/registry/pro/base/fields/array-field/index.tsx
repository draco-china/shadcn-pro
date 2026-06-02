'use client'

import { closestCenter, DndContext } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'

import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  arrayFieldAddButtonClassName,
  arrayFieldAddIconClassName,
  arrayFieldRootClassName,
} from './classes'
import { SortableItem } from './sortable-item'
import type { ArrayFieldProps } from './types'
import { useArrayField } from './use-array-field'

export type { ArrayFieldProps } from './types'

export function ArrayField<TItem extends object = Record<string, unknown>>({
  value,
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
  const { ids, items, sensors, add, remove, update, move } = useArrayField({
    value,
    defaultValue,
    onChange,
  })
  const atMax = max !== undefined && items.length >= max
  const atMin = items.length <= min

  return (
    <div className={cn(arrayFieldRootClassName, className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (over) move(active.id, over.id)
        }}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={ids[index]}
              id={ids[index]}
              onRemove={() => remove(index)}
              disabled={disabled}
              canRemove={!atMin}
            >
              {renderItem(item, index, {
                update: (next) => update(index, next),
                remove: () => remove(index),
              })}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      {!atMax && (
        <ProButton
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => add(newItem())}
          className={arrayFieldAddButtonClassName}
          prefix={<Plus className={arrayFieldAddIconClassName} />}
        >
          {addText}
        </ProButton>
      )}
    </div>
  )
}

ArrayField.displayName = 'ArrayField'
