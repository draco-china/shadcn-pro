import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import type { ProTableState } from '../../types'
import type { ColumnFilterConfig, ProTableUrlStateConfig, SearchRecord } from './types'

export function getInitialUrlTableState(
  search: SearchRecord,
  config: ProTableUrlStateConfig,
): Partial<ProTableState> {
  return {
    pagination: getPagination(search, config),
    sorting: getSorting(search, config),
    columnFilters: getColumnFilters(search, config.columnFilters),
  }
}

function getPagination(search: SearchRecord, config: ProTableUrlStateConfig): PaginationState {
  const page = getNumber(search[config.pageKey], config.defaultPage)
  const pageSize = getNumber(search[config.pageSizeKey], config.defaultPageSize)
  return { pageIndex: Math.max(0, page - 1), pageSize }
}

function getColumnFilters(search: SearchRecord, configs: ColumnFilterConfig[]): ColumnFiltersState {
  return configs.flatMap<ColumnFiltersState[number]>((cfg) => {
    const deserialize = cfg.deserialize ?? ((value: unknown) => value)
    const value = deserialize(search[cfg.searchKey])

    if (cfg.type === 'array') {
      return Array.isArray(value) && value.length > 0 ? [{ id: cfg.columnId, value }] : []
    }

    if (typeof value === 'string' && value.trim() !== '') {
      return [{ id: cfg.columnId, value }]
    }

    return []
  })
}

function getSorting(search: SearchRecord, config: ProTableUrlStateConfig): SortingState {
  const id = search[config.sortKey]
  if (typeof id !== 'string' || id.trim() === '') return []

  return [
    {
      id,
      desc: search[config.orderKey] === 'desc',
    },
  ]
}

function getNumber(value: unknown, fallback: number) {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}
