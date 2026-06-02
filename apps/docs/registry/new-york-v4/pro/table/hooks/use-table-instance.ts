'use client'

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import type { Dispatch, SetStateAction } from 'react'
import { getRankedSortedRowModel } from './ranked-row-model'
import type { useProTableColumnState } from './use-table-column-state'
import { useProTableStateHandlers } from './use-table-state-handlers'

interface ProTableInstanceOptions<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  columnState: ReturnType<typeof useProTableColumnState<TData, TValue>>
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
  rowSelection: RowSelectionState
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  manual: boolean
  requestTotal?: number
  dragSortRowKey?: Extract<keyof TData, string | number>
}

export function useProTableInstance<TData, TValue>({
  data,
  columns,
  columnState,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  manual,
  requestTotal,
  dragSortRowKey,
}: ProTableInstanceOptions<TData, TValue>) {
  const { handleSortingChange, handleColumnFiltersChange } = useProTableStateHandlers({
    setPagination,
    setSorting,
    setColumnFilters,
  })

  return useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder: columnState.columnOrder,
      columnPinning: columnState.columnPinning,
      pagination,
    },
    enableRowSelection: true,
    enableColumnPinning: columnState.pinningEnabled,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: columnState.setColumnOrder,
    onColumnPinningChange: columnState.handleColumnPinningChange,
    onPaginationChange: setPagination,
    ...(manual
      ? {
          manualPagination: true,
          manualSorting: true,
          manualFiltering: true,
          rowCount: requestTotal,
        }
      : {}),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getRankedSortedRowModel<TData>(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: dragSortRowKey ? (row) => String(row[dragSortRowKey]) : undefined,
  })
}
