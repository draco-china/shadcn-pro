'use client'

import type { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { sortableId, useArrayFieldIds } from './use-array-field-ids'
import { useArrayFieldSensors } from './use-array-field-sensors'

export type ArrayFieldUpdate<TItem extends object> = TItem | ((current: TItem) => TItem)

function resolveArrayFieldUpdate<TItem extends object>(item: TItem, next: ArrayFieldUpdate<TItem>) {
  if (typeof next === 'function') return next(item)
  return next
}

export function useArrayField<TItem extends object>({
  value,
  defaultValue,
  onChange,
}: {
  value?: TItem[]
  defaultValue?: TItem[]
  onChange?: (value: TItem[]) => void
}) {
  const [internalValue, setInternalValue] = useState<TItem[]>(defaultValue ?? [])
  const isControlled = value !== undefined
  const items = isControlled ? value : internalValue
  const { ids, addId, removeId, moveId } = useArrayFieldIds(items.length)
  const sensors = useArrayFieldSensors()

  function commit(next: TItem[]) {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  function add(item: TItem) {
    addId()
    commit([...items, item])
  }

  function remove(index: number) {
    removeId(index)
    commit(items.filter((_, itemIndex) => itemIndex !== index))
  }

  function update(index: number, next: ArrayFieldUpdate<TItem>) {
    commit(
      items.map((item, itemIndex) =>
        itemIndex === index ? resolveArrayFieldUpdate(item, next) : item,
      ),
    )
  }

  function move(activeId: UniqueIdentifier, overId: UniqueIdentifier) {
    if (activeId === overId) return

    const oldIndex = ids.indexOf(sortableId(activeId))
    const newIndex = ids.indexOf(sortableId(overId))
    if (oldIndex === -1 || newIndex === -1) return

    moveId(oldIndex, newIndex)
    commit(arrayMove(items, oldIndex, newIndex))
  }

  return {
    ids,
    items,
    sensors,
    add,
    remove,
    update,
    move,
  }
}
