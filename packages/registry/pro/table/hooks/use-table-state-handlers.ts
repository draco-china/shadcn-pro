'use client'

import type {
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { type Dispatch, type SetStateAction, useCallback } from 'react'

interface ProTableStateHandlersOptions {
  setPagination: Dispatch<SetStateAction<PaginationState>>
  setSorting: Dispatch<SetStateAction<SortingState>>
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}

export function useProTableStateHandlers({
  setPagination,
  setSorting,
  setColumnFilters,
}: ProTableStateHandlersOptions) {
  const resetToFirstPage = useCallback(() => {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }, [setPagination])
  const handleSortingChange = useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      setSorting(updater)
      resetToFirstPage()
    },
    [resetToFirstPage, setSorting],
  )
  const handleColumnFiltersChange = useCallback<OnChangeFn<ColumnFiltersState>>(
    (updater) => {
      setColumnFilters(updater)
      resetToFirstPage()
    },
    [resetToFirstPage, setColumnFilters],
  )

  return { handleSortingChange, handleColumnFiltersChange }
}
