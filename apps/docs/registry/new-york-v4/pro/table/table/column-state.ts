import type { ColumnPinningState } from '@tanstack/react-table'
import type { ProTableTableOptions } from '../types'

export function reconcileColumnOrder(current: string[], next: string[]) {
  const nextIds = new Set(next)
  const currentIds = new Set(current)

  return [...current.filter((id) => nextIds.has(id)), ...next.filter((id) => !currentIds.has(id))]
}

export function getColumnPinningState(
  tableOptions: ProTableTableOptions | undefined,
  internalColumnPinning: ColumnPinningState,
) {
  if (typeof tableOptions?.pinning === 'object' && tableOptions.pinning.value) {
    return tableOptions.pinning.value
  }

  return internalColumnPinning
}

export function shouldSyncInternalColumnPinning(tableOptions: ProTableTableOptions | undefined) {
  return !(
    tableOptions?.pinning === false ||
    (typeof tableOptions?.pinning === 'object' && tableOptions.pinning.value)
  )
}
