'use client'

import type { OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import * as React from 'react'

export interface ProTableUrlStateOptions {
  /** Default page size (default: 10). */
  defaultPageSize?: number
  /** URL param key prefix to avoid collisions when multiple tables exist on the same page. */
  prefix?: string
}

export interface ProTableUrlStateResult {
  /** Pass directly to `<ProTable pagination={...} />`. */
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  /** Pass directly to `<ProTable sorting={...} />`. */
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  /** Current search term synced to URL. */
  search: string
  setSearch: (value: string) => void
}

/**
 * Sync ProTable pagination, sorting, and search state with URL query params
 * via `nuqs`. Drop the result directly into `<ProTable {...urlState} />`.
 *
 * @example
 * ```tsx
 * const urlState = useProTableUrlState()
 * const { data } = useSWR(['/api/users', urlState.pagination, urlState.sorting])
 *
 * return (
 *   <ProTable
 *     {...urlState}
 *     data={data}
 *     columns={columns}
 *     manualPagination
 *     manualSorting
 *     total={data?.total}
 *   />
 * )
 * ```
 */
export function useProTableUrlState(options: ProTableUrlStateOptions = {}): ProTableUrlStateResult {
  const { defaultPageSize = 10, prefix = '' } = options

  const pageKey = prefix ? `${prefix}_page` : 'page'
  const pageSizeKey = prefix ? `${prefix}_pageSize` : 'pageSize'
  const sortKey = prefix ? `${prefix}_sort` : 'sort'
  const orderKey = prefix ? `${prefix}_order` : 'order'
  const searchKey = prefix ? `${prefix}_search` : 'search'

  const [params, setParams] = useQueryStates({
    [pageKey]: parseAsInteger.withDefault(1),
    [pageSizeKey]: parseAsInteger.withDefault(defaultPageSize),
    [sortKey]: parseAsString.withDefault(''),
    [orderKey]: parseAsString.withDefault(''),
    [searchKey]: parseAsString.withDefault(''),
  })

  const page: number = params[pageKey] as number
  const pageSize: number = params[pageSizeKey] as number
  const sort: string = params[sortKey] as string
  const order: string = params[orderKey] as string
  const search: string = params[searchKey] as string

  // tanstack table uses 0-indexed pageIndex
  const pagination = React.useMemo<PaginationState>(
    () => ({ pageIndex: page - 1, pageSize }),
    [page, pageSize],
  )

  const onPaginationChange = React.useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater
      void setParams({
        [pageKey]: next.pageIndex + 1,
        [pageSizeKey]: next.pageSize,
      })
    },
    [pagination, pageKey, pageSizeKey, setParams],
  )

  const sorting = React.useMemo<SortingState>(
    () => (sort ? [{ id: sort, desc: order === 'desc' }] : []),
    [sort, order],
  )

  const onSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater
      const first = next[0]
      void setParams({
        [sortKey]: first?.id ?? '',
        [orderKey]: first ? (first.desc ? 'desc' : 'asc') : '',
        // Reset to page 1 on sort change
        [pageKey]: 1,
      })
    },
    [sorting, sortKey, orderKey, pageKey, setParams],
  )

  const setSearch = React.useCallback(
    (value: string) => {
      void setParams({ [searchKey]: value, [pageKey]: 1 })
    },
    [searchKey, pageKey, setParams],
  )

  return {
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
    search,
    setSearch,
  }
}
