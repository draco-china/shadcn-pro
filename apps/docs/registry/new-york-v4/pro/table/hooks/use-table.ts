'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction, useMemo } from 'react'
import { useProTablePinnedColumnOffsets } from '../table/pinning'
import type { ProTableStateController } from '../table/state'
import type {
  ProTableDragSortOptions,
  ProTablePaginationOptions,
  ProTableTableOptions,
  ProTableToolbarOptions,
} from '../types'
import { useProTableColumnState } from './use-table-column-state'
import { withProTableColumnDefaults } from './use-table-columns'
import { useProTableDragSort } from './use-table-drag-sort'
import { useProTableInstance } from './use-table-instance'
import { useProTablePaginationClamp } from './use-table-pagination'
import { useProTableUiState } from './use-table-ui-state'
import { useProTableViewState } from './use-table-view-state'

export interface ProTableController<TData, TValue> extends Omit<ProTableStateController, 'state'> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setData: Dispatch<SetStateAction<TData[]>>
  toolbar?: false | ProTableToolbarOptions<TData>
  paginationOptions?: false | ProTablePaginationOptions
  dragSort?: false | ProTableDragSortOptions<TData>
  tableOptions?: ProTableTableOptions
  manual?: boolean
  requestTotal?: number
}

export function useProTable<TData, TValue>({
  columns,
  data,
  setData,
  toolbar,
  paginationOptions,
  dragSort,
  tableOptions,
  manual = false,
  requestTotal,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
}: ProTableController<TData, TValue>) {
  const uiState = useProTableUiState()
  const tableColumns = useMemo(
    () =>
      withProTableColumnDefaults(columns, typeof toolbar === 'object' ? toolbar.search : undefined),
    [columns, toolbar],
  )
  const columnState = useProTableColumnState(tableColumns, tableOptions)
  const dragSortRowKey = dragSort ? dragSort.rowKey : undefined
  const table = useProTableInstance({
    data,
    columns: tableColumns,
    columnState,
    columnVisibility: uiState.columnVisibility,
    setColumnVisibility: uiState.setColumnVisibility,
    rowSelection: uiState.rowSelection,
    setRowSelection: uiState.setRowSelection,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    manual,
    requestTotal,
    dragSortRowKey,
  })
  useProTablePaginationClamp({
    table,
    pagination,
    setPagination,
    paginationOptions,
  })

  const dragSortState = useProTableDragSort({ data, dragSort, setData, table })
  const pinnedOffsets = useProTablePinnedColumnOffsets(
    table,
    uiState.tableRef,
    dragSortState.enabled,
  )
  const viewState = useProTableViewState({
    table,
    tableSize: uiState.tableSize,
    dragSortEnabled: dragSortState.enabled,
  })

  return {
    table,
    tableRef: uiState.tableRef,
    tableSize: uiState.tableSize,
    setTableSize: uiState.setTableSize,
    ...viewState,
    pinnedOffsets,
    sensors: dragSortState.sensors,
    handleDragEnd: dragSortState.handleDragEnd,
    dragSortEnabled: dragSortState.enabled,
    defaultColumnOrder: columnState.defaultColumnOrder,
    defaultColumnPinning: columnState.defaultColumnPinning,
  }
}
