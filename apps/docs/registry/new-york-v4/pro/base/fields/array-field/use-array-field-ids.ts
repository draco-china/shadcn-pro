'use client'

import type { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function createItemId() {
  return `item-${Math.random().toString(36).slice(2)}`
}

export function sortableId(id: UniqueIdentifier) {
  return String(id)
}

export function useArrayFieldIds(length: number) {
  const [ids, setIds] = useState<string[]>(() => Array.from({ length }, createItemId))

  useEffect(() => {
    setIds((prev) => {
      if (prev.length === length) return prev
      if (length > prev.length) {
        return [...prev, ...Array.from({ length: length - prev.length }, createItemId)]
      }
      return prev.slice(0, length)
    })
  }, [length])

  function addId() {
    setIds((prev) => [...prev, createItemId()])
  }

  function removeId(index: number) {
    setIds((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
  }

  function moveId(oldIndex: number, newIndex: number) {
    setIds((prev) => arrayMove(prev, oldIndex, newIndex))
  }

  return { ids, addId, removeId, moveId }
}
