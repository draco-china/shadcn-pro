'use client'

import type { ColumnDef, ColumnPinningState, OnChangeFn } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getColumnPinningState,
  reconcileColumnOrder,
  shouldSyncInternalColumnPinning,
} from '../table/column-state'
import { getDefaultColumnPinning, getLeafColumnIds } from '../table/column-utils'
import type { ProTableTableOptions } from '../types'

export function useProTableColumnState<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  tableOptions: ProTableTableOptions | undefined,
) {
  const pinningEnabled = tableOptions?.pinning !== false
  const defaultColumnOrder = useMemo(() => getLeafColumnIds(columns), [columns])
  const defaultColumnPinning = useMemo(
    () => (pinningEnabled ? getDefaultColumnPinning(columns) : {}),
    [columns, pinningEnabled],
  )
  const [columnOrder, setColumnOrder] = useState<string[]>(defaultColumnOrder)
  const [internalColumnPinning, setInternalColumnPinning] =
    useState<ColumnPinningState>(defaultColumnPinning)
  const columnPinning = getColumnPinningState(tableOptions, internalColumnPinning)

  useEffect(() => {
    setColumnOrder((current) => reconcileColumnOrder(current, defaultColumnOrder))
  }, [defaultColumnOrder])
  useEffect(() => {
    if (!shouldSyncInternalColumnPinning(tableOptions)) return
    setInternalColumnPinning(defaultColumnPinning)
  }, [tableOptions?.pinning, defaultColumnPinning])

  const handleColumnPinningChange = useCallback<OnChangeFn<ColumnPinningState>>(
    (updater) => {
      setInternalColumnPinning((current) => {
        const next = typeof updater === 'function' ? updater(current) : updater
        if (typeof tableOptions?.pinning === 'object') tableOptions.pinning.onChange?.(next)
        return next
      })
    },
    [tableOptions?.pinning],
  )

  return {
    columnOrder,
    setColumnOrder,
    columnPinning,
    handleColumnPinningChange,
    defaultColumnOrder,
    defaultColumnPinning,
    pinningEnabled,
  }
}
