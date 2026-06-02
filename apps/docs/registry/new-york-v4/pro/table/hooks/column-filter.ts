import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn, SortingFn } from '@tanstack/react-table'
import type { ProTableColumnFilter } from '../types'

export function getDefaultFilterFn<TData>(
  multiple: ProTableColumnFilter['multiple'],
): FilterFn<TData> | 'equals' {
  return multiple ? createMultiValueFilter<TData>() : 'equals'
}

export function createFilterFn<TData>(
  onFilter: NonNullable<ProTableColumnFilter<TData>['onFilter']>,
): FilterFn<TData> {
  return (row, _columnId, filterValue) => {
    const values = toFilterValues(filterValue)
    return values.length === 0 || values.some((value) => onFilter(String(value), row.original))
  }
}

export function createFuzzyFilter<TData>(): FilterFn<TData> {
  return (row, columnId, filterValue, addMeta) => {
    const value = String(filterValue ?? '')
    if (!value) return true

    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

export function createFuzzySort<TData>(): SortingFn<TData> {
  return (rowA, rowB, columnId) => {
    const rankA = rowA.columnFiltersMeta[columnId]?.itemRank
    const rankB = rowB.columnFiltersMeta[columnId]?.itemRank

    if (rankA && rankB) {
      const rankSort = compareItems(rankA, rankB)
      if (rankSort !== 0) return rankSort
    }

    return collator.compare(
      String(rowA.getValue(columnId) ?? ''),
      String(rowB.getValue(columnId) ?? ''),
    )
  }
}

function createMultiValueFilter<TData>(): FilterFn<TData> {
  return (row, columnId, filterValue) => {
    const values = toFilterValues(filterValue)
    return values.length === 0 || values.includes(row.getValue(columnId))
  }
}

function toFilterValues(filterValue: unknown) {
  if (Array.isArray(filterValue)) return filterValue
  if (filterValue === undefined || filterValue === null || filterValue === '') return []
  return [filterValue]
}
