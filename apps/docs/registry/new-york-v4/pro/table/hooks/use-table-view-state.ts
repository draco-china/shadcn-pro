'use client'

import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { ProTableRenderContext, TableSize } from '../types'

export function useProTableViewState<TData>({
  table,
  tableSize,
  dragSortEnabled,
}: {
  table: Table<TData>
  tableSize: TableSize
  dragSortEnabled: boolean
}) {
  const rows = table.getRowModel().rows
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const visibleColumns = table.getVisibleLeafColumns()
  const renderContext = useMemo<ProTableRenderContext<TData>>(
    () => ({ table, rows, selectedRows, tableSize }),
    [table, rows, selectedRows, tableSize],
  )

  return {
    rows,
    selectedRows,
    visibleColumns,
    rowIds: rows.map((row) => row.id),
    visibleColumnCount: visibleColumns.length + (dragSortEnabled ? 1 : 0),
    renderContext,
  }
}
