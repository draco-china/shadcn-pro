import type { ColumnFiltersState, PaginationState } from '@tanstack/react-table'
import { useMemo } from 'react'
import type { ProTableState } from './index'

type SearchRecord = Record<string, unknown>

export type NavigateFn = (opts: {
  search: true | SearchRecord | ((prev: SearchRecord) => Partial<SearchRecord> | SearchRecord)
  replace?: boolean
}) => void

type ColumnFilterConfig =
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

type UseProTableUrlStateParams = {
  search: SearchRecord
  navigate: NavigateFn
  pagination?: {
    pageKey?: string
    pageSizeKey?: string
    defaultPage?: number
    defaultPageSize?: number
  }
  columnFilters?: ColumnFilterConfig[]
}

type UseProTableUrlStateReturn = {
  defaultState: Partial<ProTableState>
  onStateChange: (state: ProTableState) => void
  ensurePageInRange: (pageCount: number, opts?: { resetTo?: 'first' | 'last' }) => void
}

export function useProTableUrlState(params: UseProTableUrlStateParams): UseProTableUrlStateReturn {
  const {
    search,
    navigate,
    pagination: paginationCfg,
    columnFilters: columnFiltersCfg = [],
  } = params

  const pageKey = paginationCfg?.pageKey ?? 'page'
  const pageSizeKey = paginationCfg?.pageSizeKey ?? 'pageSize'
  const defaultPage = paginationCfg?.defaultPage ?? 1
  const defaultPageSize = paginationCfg?.defaultPageSize ?? 10

  const defaultState = useMemo<Partial<ProTableState>>(
    () => ({
      pagination: getPagination(search, pageKey, pageSizeKey, defaultPage, defaultPageSize),
      columnFilters: getColumnFilters(search, columnFiltersCfg),
    }),
    [search, pageKey, pageSizeKey, defaultPage, defaultPageSize, columnFiltersCfg],
  )

  const onStateChange = (state: ProTableState) => {
    const patch: Record<string, unknown> = {
      [pageKey]:
        state.pagination.pageIndex + 1 <= defaultPage ? undefined : state.pagination.pageIndex + 1,
      [pageSizeKey]:
        state.pagination.pageSize === defaultPageSize ? undefined : state.pagination.pageSize,
    }

    for (const cfg of columnFiltersCfg) {
      const found = state.columnFilters.find((filter) => filter.id === cfg.columnId)
      const serialize = cfg.serialize ?? ((value: unknown) => value)

      if (cfg.type === 'array') {
        const value = Array.isArray(found?.value) ? (found.value as unknown[]) : []
        patch[cfg.searchKey] = value.length > 0 ? serialize(value) : undefined
        continue
      }

      const value = typeof found?.value === 'string' ? found.value : ''
      patch[cfg.searchKey] = value.trim() !== '' ? serialize(value) : undefined
    }

    navigate({
      search: (prev) => ({
        ...(prev as SearchRecord),
        ...patch,
      }),
    })
  }

  const ensurePageInRange = (
    pageCount: number,
    opts: { resetTo?: 'first' | 'last' } = { resetTo: 'first' },
  ) => {
    const pageNum = getNumber(search[pageKey], defaultPage)
    if (pageCount > 0 && pageNum > pageCount) {
      navigate({
        replace: true,
        search: (prev) => ({
          ...(prev as SearchRecord),
          [pageKey]: opts.resetTo === 'last' ? pageCount : undefined,
        }),
      })
    }
  }

  return { defaultState, onStateChange, ensurePageInRange }
}

function getPagination(
  search: SearchRecord,
  pageKey: string,
  pageSizeKey: string,
  defaultPage: number,
  defaultPageSize: number,
): PaginationState {
  const page = getNumber(search[pageKey], defaultPage)
  const pageSize = getNumber(search[pageSizeKey], defaultPageSize)
  return { pageIndex: Math.max(0, page - 1), pageSize }
}

function getColumnFilters(search: SearchRecord, configs: ColumnFilterConfig[]): ColumnFiltersState {
  const filters: ColumnFiltersState = []
  for (const cfg of configs) {
    const deserialize = cfg.deserialize ?? ((value: unknown) => value)
    const value = deserialize(search[cfg.searchKey])

    if (cfg.type === 'array') {
      if (Array.isArray(value) && value.length > 0) {
        filters.push({ id: cfg.columnId, value })
      }
      continue
    }

    if (typeof value === 'string' && value.trim() !== '') {
      filters.push({ id: cfg.columnId, value })
    }
  }
  return filters
}

function getNumber(value: unknown, fallback: number) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}
