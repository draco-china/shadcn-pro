'use client'

import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'

/** Internal table state shape shared with the public entry point. */
export interface ProTableStateValue {
  pagination: PaginationState
  sorting: SortingState
  columnFilters: ColumnFiltersState
}

/** Internal URL mapping for a table filter. */
export type UrlColumnFilterConfig =
  | {
      columnId: string
      searchKey: string
      type?: 'string'
      serialize?: (value: unknown) => unknown
      deserialize?: (value: unknown) => unknown
    }
  | {
      columnId: string
      searchKey: string
      type: 'array'
      serialize?: (value: unknown) => unknown
      deserialize?: (value: unknown) => unknown
    }

/** Internal implementation of the public URL state hook. */
export function useProTableUrlStateValue(params: {
  search: Record<string, unknown>
  navigate: (opts: {
    search:
      | true
      | Record<string, unknown>
      | ((
          prev: Record<string, unknown>,
        ) => Partial<Record<string, unknown>> | Record<string, unknown>)
    replace?: boolean
  }) => void
  pagination?: {
    pageKey?: string
    pageSizeKey?: string
    defaultPage?: number
    defaultPageSize?: number
  }
  sorting?: {
    sortKey?: string
    orderKey?: string
  }
  columnFilters?: UrlColumnFilterConfig[]
}): {
  initialState: Partial<ProTableStateValue>
  onChange: (state: ProTableStateValue) => void
} {
  const {
    search,
    navigate,
    pagination: paginationCfg,
    sorting: sortingCfg,
    columnFilters: columnFiltersCfg,
  } = params
  const pageKey = paginationCfg?.pageKey ?? 'page'
  const pageSizeKey = paginationCfg?.pageSizeKey ?? 'pageSize'
  const defaultPage = paginationCfg?.defaultPage ?? 1
  const defaultPageSize = paginationCfg?.defaultPageSize ?? 10
  const sortKey = sortingCfg?.sortKey ?? 'sort'
  const orderKey = sortingCfg?.orderKey ?? 'order'

  const initialState = useMemo<Partial<ProTableStateValue>>(() => {
    const page = typeof search[pageKey] === 'number' ? search[pageKey] : Number(search[pageKey])
    const pageSize =
      typeof search[pageSizeKey] === 'number' ? search[pageSizeKey] : Number(search[pageSizeKey])
    const sortId = search[sortKey]
    const columnFilters: ColumnFiltersState = []

    for (const cfg of columnFiltersCfg ?? []) {
      const value = cfg.deserialize ? cfg.deserialize(search[cfg.searchKey]) : search[cfg.searchKey]
      if (cfg.type === 'array') {
        if (Array.isArray(value) && value.length > 0) {
          columnFilters.push({ id: cfg.columnId, value })
        }
        continue
      }
      if (typeof value === 'string' && value.trim() !== '') {
        columnFilters.push({ id: cfg.columnId, value })
      }
    }

    const sorting: SortingState =
      typeof sortId === 'string' && sortId.trim() !== ''
        ? [{ id: sortId, desc: search[orderKey] === 'desc' }]
        : []

    return {
      pagination: {
        pageIndex: Math.max(0, (Number.isFinite(page) ? page : defaultPage) - 1),
        pageSize: Number.isFinite(pageSize) ? pageSize : defaultPageSize,
      },
      sorting,
      columnFilters,
    }
  }, [
    columnFiltersCfg,
    defaultPage,
    defaultPageSize,
    orderKey,
    pageKey,
    pageSizeKey,
    search,
    sortKey,
  ])

  const onChange = useCallback(
    (state: ProTableStateValue) => {
      const sorting = state.sorting[0]
      const patch: Record<string, unknown> = {
        [pageKey]: undefined,
        [pageSizeKey]: undefined,
        [sortKey]: undefined,
        [orderKey]: undefined,
      }

      const nextPage = state.pagination.pageIndex + 1
      if (nextPage > defaultPage) patch[pageKey] = nextPage
      if (state.pagination.pageSize !== defaultPageSize) {
        patch[pageSizeKey] = state.pagination.pageSize
      }
      if (sorting) {
        patch[sortKey] = sorting.id
        patch[orderKey] = sorting.desc ? 'desc' : 'asc'
      }

      const filterValues = new Map(
        state.columnFilters.map((filter) => [filter.id, filter.value] as const),
      )
      for (const cfg of columnFiltersCfg ?? []) {
        const filterValue = filterValues.get(cfg.columnId)
        patch[cfg.searchKey] = undefined

        if (cfg.type === 'array') {
          const value = Array.isArray(filterValue) ? filterValue : []
          if (value.length > 0) patch[cfg.searchKey] = cfg.serialize?.(value) ?? value
          continue
        }

        const value = typeof filterValue === 'string' ? filterValue : ''
        if (value.trim() !== '') patch[cfg.searchKey] = cfg.serialize?.(value) ?? value
      }

      navigate({ search: (previous) => ({ ...previous, ...patch }) })
    },
    [
      columnFiltersCfg,
      defaultPage,
      defaultPageSize,
      navigate,
      orderKey,
      pageKey,
      pageSizeKey,
      sortKey,
    ],
  )

  return { initialState, onChange }
}
