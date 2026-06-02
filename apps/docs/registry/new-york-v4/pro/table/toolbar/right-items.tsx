import type { ColumnPinningState, Table } from '@tanstack/react-table'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { TableSize } from '../types'
import { getToolbarColumnsItem } from './columns-item'
import { getToolbarDensityItem } from './density-item'
import { getToolbarRefreshItem } from './refresh-item'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'
import { isToolbarItem } from './utils'

export function getToolbarRightItems<TData>({
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
}: {
  table: Table<TData>
  actions?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  columns: boolean
  density: boolean
  refresh?: () => void
  disabled: boolean
  onTableSizeChange?: (size: TableSize) => void
  labels?: ProTableToolbarLabels
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}): ProToolbarItem<ProTableToolbarContext<TData>>[] {
  const refreshItem = getToolbarRefreshItem<TData>({ refresh, disabled, labels })
  const densityItem = getToolbarDensityItem<TData>({
    enabled: density,
    disabled,
    onTableSizeChange,
    labels,
  })
  const columnsItem = getToolbarColumnsItem({
    table,
    enabled: columns,
    disabled,
    labels,
    defaultColumnOrder,
    defaultColumnPinning,
  })

  return [
    ...(actions?.length ? [...actions, { key: 'actions-separator', separator: true }] : []),
    refreshItem,
    densityItem,
    columnsItem,
  ].filter(isToolbarItem)
}
