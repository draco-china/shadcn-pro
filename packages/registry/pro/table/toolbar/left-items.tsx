import type { Table } from '@tanstack/react-table'
import type { ProToolbarItem, ProToolbarRegion } from '@/components/pro/base/toolbar'
import type { ProTableSearch } from '../types'
import { getToolbarFilterItems } from './filter-items'
import { getToolbarResetItem } from './reset-item'
import { getToolbarSearchItem } from './search-item'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'
import { isToolbarItem } from './utils'

export function getToolbarLeftRegion<TData>({
  table,
  search,
  filters,
  disabled,
  labels,
}: {
  table: Table<TData>
  search: ProTableSearch | undefined
  filters?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  disabled: boolean
  labels?: ProTableToolbarLabels
}): ProToolbarRegion<ProTableToolbarContext<TData>> {
  const searchItem = getToolbarSearchItem({ table, search, disabled, labels })
  const resetItem = getToolbarResetItem({ table, disabled, labels })
  const items = [searchItem, ...getToolbarFilterItems(table), resetItem, ...(filters ?? [])].filter(
    isToolbarItem,
  )

  return {
    className: 'min-w-0 md:flex-1',
    options: items,
  }
}
