'use client'

import { ProToolbar } from '@/components/pro/base/toolbar'
import { AutoFilterCell } from './auto-filter-cell'
import { tableToolbarClassName } from './classes'
import { getToolbarLeftRegion } from './left-items'
import { getToolbarRightItems } from './right-items'
import type { ProTableToolbarProps } from './types'

export type { ProTableToolbarContext, ProTableToolbarLabels, ProTableToolbarProps } from './types'
export { AutoFilterCell }

export function ProTableToolbar<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
  search,
  filters,
  actions,
  columns = true,
  density = true,
  refresh,
  disabled = false,
  tableSize = 'default',
  onTableSizeChange,
  labels,
  context,
}: ProTableToolbarProps<TData>) {
  return (
    <ProToolbar
      context={{ ...context, tableSize }}
      left={getToolbarLeftRegion({
        table,
        search,
        filters,
        disabled,
        labels,
      })}
      right={{
        options: getToolbarRightItems({
          table,
          actions,
          columns,
          density,
          refresh,
          disabled,
          onTableSizeChange,
          labels,
          defaultColumnOrder,
          defaultColumnPinning,
        }),
      }}
      className={tableToolbarClassName}
    />
  )
}
