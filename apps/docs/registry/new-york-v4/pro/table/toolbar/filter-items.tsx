import type { Table } from '@tanstack/react-table'
import { FacetedFilter } from '@/components/pro/base/filter/faceted-filter'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { getColumnMeta } from '../table/column-align'
import { tableFilterTriggerClassName } from './classes'
import type { ProTableToolbarContext } from './types'
import { getFacetedFilterValue } from './utils'

export function getToolbarFilterItems<TData>(
  table: Table<TData>,
): ProToolbarItem<ProTableToolbarContext<TData>>[] {
  return table.getAllColumns().flatMap((column) => {
    const filter = getColumnMeta(column)?.filter
    if (!filter) return []

    return [
      {
        key: `filter-${column.id}`,
        render: () => (
          <FacetedFilter
            options={filter.options}
            placeholder={filter.placeholder ?? column.id}
            multiple={filter.multiple}
            value={getFacetedFilterValue(column.getFilterValue())}
            facets={column.getFacetedUniqueValues()}
            onChange={(value) => column.setFilterValue(value)}
            className={tableFilterTriggerClassName}
          />
        ),
      },
    ]
  })
}
