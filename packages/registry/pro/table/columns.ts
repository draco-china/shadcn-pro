import type { ColumnPinningState } from '@tanstack/react-table'

/** Default pinning for built-in utility columns. */
export function getSystemColumnPinning(id: string | undefined) {
  if (id === 'select' || id === 'drag') return 'left'
  if (id === 'actions' || id === 'operation') return 'right'
  return undefined
}

/** Calculates column order and pinning after a settings-panel drop. */
export function getColumnDropState({
  columnOrder,
  sortableOrder,
  columnPinning,
  activeId,
  overId,
  targetSide,
  pinningEnabled,
}: {
  columnOrder: string[]
  sortableOrder: string[]
  columnPinning: ColumnPinningState
  activeId: string
  overId: string
  targetSide: false | 'left' | 'right'
  pinningEnabled: boolean
}) {
  const oldIndex = sortableOrder.indexOf(activeId)
  const newIndex = sortableOrder.indexOf(overId)
  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return undefined

  const nextSortableOrder = moveItem(sortableOrder, oldIndex, newIndex)
  const sortableIds = new Set(nextSortableOrder)
  const iterator = nextSortableOrder[Symbol.iterator]()
  const order = columnOrder.map((columnId) =>
    sortableIds.has(columnId) ? (iterator.next().value ?? columnId) : columnId,
  )

  if (!pinningEnabled) return { order, pinning: columnPinning }

  const leftIds = new Set(columnPinning.left ?? [])
  const rightIds = new Set(columnPinning.right ?? [])
  leftIds.delete(activeId)
  rightIds.delete(activeId)
  if (targetSide === 'left') leftIds.add(activeId)
  if (targetSide === 'right') rightIds.add(activeId)

  return {
    order,
    pinning: {
      left: [
        ...(columnPinning.left ?? []).filter((columnId) => !sortableIds.has(columnId)),
        ...nextSortableOrder.filter((columnId) => leftIds.has(columnId)),
      ],
      right: [
        ...nextSortableOrder.filter((columnId) => rightIds.has(columnId)),
        ...(columnPinning.right ?? []).filter((columnId) => !sortableIds.has(columnId)),
      ],
    },
  }
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items]
  const [item] = next.splice(from, 1)
  if (item !== undefined) next.splice(to, 0, item)
  return next
}
