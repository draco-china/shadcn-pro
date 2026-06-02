import type { ColumnDef } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { getColumnDefId } from '../table/column-utils'
import { getProTableSystemColumnDefaults } from '../table/system-columns'
import type { ProTableSearch } from '../types'
import {
  createFilterFn,
  createFuzzyFilter,
  createFuzzySort,
  getDefaultFilterFn,
} from './column-filter'

export function withProTableColumnDefaults<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  toolbarSearch?: ProTableSearch,
): ColumnDef<TData, TValue>[] {
  return columns.map((column, index) => {
    const children =
      'columns' in column && Array.isArray(column.columns)
        ? withProTableColumnDefaults(column.columns, toolbarSearch)
        : undefined
    const filter = column.meta?.filter
    const search = getColumnSearch(column, index, toolbarSearch)
    const shouldApplyFilter = filter && column.filterFn === undefined
    const shouldApplySearchFilter = search && !filter && column.filterFn === undefined
    const shouldApplyFuzzySort = search && column.sortingFn === undefined
    const id = 'id' in column && typeof column.id === 'string' ? column.id : undefined
    const systemDefaults = getProTableSystemColumnDefaults(id)

    if (
      !children &&
      !shouldApplyFilter &&
      !shouldApplySearchFilter &&
      !shouldApplyFuzzySort &&
      !systemDefaults
    ) {
      return column
    }

    return {
      ...column,
      ...(children ? { columns: children } : {}),
      ...(systemDefaults
        ? {
            enableHiding: column.enableHiding ?? false,
            meta: {
              pinned: systemDefaults.pinned,
              ...column.meta,
              className: cn(systemDefaults.className, column.meta?.className),
            },
          }
        : {}),
      ...(shouldApplyFilter
        ? {
            filterFn: filter.onFilter
              ? createFilterFn(filter.onFilter)
              : getDefaultFilterFn<TData>(filter.multiple),
          }
        : {}),
      ...(shouldApplySearchFilter ? { filterFn: createFuzzyFilter<TData>() } : {}),
      ...(shouldApplyFuzzySort ? { sortingFn: createFuzzySort<TData>() } : {}),
    }
  })
}

function getColumnSearch<TData, TValue>(
  column: ColumnDef<TData, TValue>,
  index: number,
  toolbarSearch?: ProTableSearch,
) {
  if (column.meta?.search) return column.meta.search
  if (toolbarSearch === false || toolbarSearch === undefined) return undefined

  const columnId = getColumnDefId(column, index)
  if (typeof toolbarSearch === 'string') return toolbarSearch === columnId
  return toolbarSearch.columnId === columnId
}
