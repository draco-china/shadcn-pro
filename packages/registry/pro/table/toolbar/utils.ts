import type { Table } from '@tanstack/react-table'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { getColumnMeta } from '../table/column-align'
import type { ProTableColumnMeta, ProTableSearch } from '../types'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'

export type ProTableFilterValue = string | string[] | undefined

export function getSearchColumn<TData>(table: Table<TData>, search: ProTableSearch | undefined) {
  if (search === false) return undefined
  if (typeof search === 'string') return table.getColumn(search)
  if (typeof search === 'object') return table.getColumn(search.columnId)
  return table.getAllLeafColumns().find((column) => {
    const search = getColumnMeta(column)?.search
    return search !== undefined && search !== false
  })
}

export function getSearchPlaceholder<TData>(
  search: ProTableSearch | undefined,
  meta: ProTableColumnMeta<TData> | undefined,
  columnId: string | undefined,
  labels?: ProTableToolbarLabels,
) {
  if (typeof search === 'object' && search.placeholder) return search.placeholder
  if (typeof meta?.search === 'object' && meta.search.placeholder) return meta.search.placeholder
  if (labels?.search) return labels.search
  return columnId ? `Search ${columnId}...` : 'Search...'
}

export function getSearchFilterValue(value: unknown) {
  return typeof value === 'string' ? value : ''
}

export function getFacetedFilterValue(value: unknown): ProTableFilterValue {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) return value
  return undefined
}

export function isToolbarItem<TData>(
  item: ProToolbarItem<ProTableToolbarContext<TData>> | undefined,
): item is ProToolbarItem<ProTableToolbarContext<TData>> {
  return item !== undefined
}
