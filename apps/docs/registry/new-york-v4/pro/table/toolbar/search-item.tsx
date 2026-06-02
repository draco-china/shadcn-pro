import type { Column, Table } from '@tanstack/react-table'
import { Input } from '@/components/pro/base/fields/input'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { getColumnMeta } from '../table/column-align'
import type { ProTableSearch } from '../types'
import { tableSearchClassName, tableSearchInputClassName } from './classes'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'
import { getSearchColumn, getSearchFilterValue, getSearchPlaceholder } from './utils'

export function getToolbarSearchItem<TData>({
  table,
  search,
  disabled,
  labels,
}: {
  table: Table<TData>
  search: ProTableSearch | undefined
  disabled: boolean
  labels?: ProTableToolbarLabels
}): ProToolbarItem<ProTableToolbarContext<TData>> | undefined {
  const searchColumn = getSearchColumn(table, search)
  if (!searchColumn) return undefined

  return createSearchItem({
    searchColumn,
    search,
    disabled,
    labels,
  })
}

function createSearchItem<TData>({
  searchColumn,
  search,
  disabled,
  labels,
}: {
  searchColumn: Column<TData, unknown>
  search: ProTableSearch | undefined
  disabled: boolean
  labels?: ProTableToolbarLabels
}): ProToolbarItem<ProTableToolbarContext<TData>> {
  const searchMeta = getColumnMeta(searchColumn)
  const searchValue = getSearchFilterValue(searchColumn.getFilterValue())
  const searchPlaceholder = getSearchPlaceholder(search, searchMeta, searchColumn.id, labels)

  return {
    key: 'search',
    render: () => (
      <Input
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(event) => searchColumn.setFilterValue(event.target.value || undefined)}
        disabled={disabled}
        allowClear={false}
        inputClassName={tableSearchInputClassName}
        className={tableSearchClassName}
      />
    ),
  }
}
