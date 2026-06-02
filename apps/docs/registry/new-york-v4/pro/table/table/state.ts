'use client'

import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import type { ProTableState } from '../types'

export interface ProTableStateController {
  state: ProTableState
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}

export function useProTableState(initialState: Partial<ProTableState> | undefined) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  )
  const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? [])
  const [pagination, setPagination] = useState<PaginationState>(
    initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const state = useMemo<ProTableState>(
    () => ({ pagination, sorting, columnFilters }),
    [pagination, sorting, columnFilters],
  )

  return {
    state,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  }
}

export function useProTableStateChange(
  onChange: ((state: ProTableState) => void) | undefined,
  state: ProTableState,
) {
  const mountedRef = useRef(false)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onChange?.(state)
  }, [onChange, state])
}
