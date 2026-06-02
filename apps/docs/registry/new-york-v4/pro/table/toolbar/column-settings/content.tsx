'use client'

import type { ColumnPinningState, Table } from '@tanstack/react-table'
import { ColumnSettingsHeader } from './header'
import { ColumnSettingsList } from './list'
import { getOrderedHideableColumns } from './utils'

export function ProTableColumnSettings<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
}: {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}) {
  const columns = table.getAllLeafColumns()
  const columnOrder = table.getState().columnOrder.length
    ? table.getState().columnOrder
    : defaultColumnOrder
  const orderedColumns = getOrderedHideableColumns(columns, columnOrder)
  const canPinColumns = table.options.enableColumnPinning !== false

  return (
    <>
      <ColumnSettingsHeader
        table={table}
        defaultColumnOrder={defaultColumnOrder}
        defaultColumnPinning={defaultColumnPinning}
        canPinColumns={canPinColumns}
      />
      <ColumnSettingsList
        table={table}
        columns={orderedColumns}
        columnOrder={columnOrder}
        canPinColumns={canPinColumns}
      />
    </>
  )
}
