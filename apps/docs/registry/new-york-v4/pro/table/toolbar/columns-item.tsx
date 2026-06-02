import type { ColumnPinningState, Table } from '@tanstack/react-table'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { ProTableColumnSettingsButton } from './column-settings/button'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'

export function getToolbarColumnsItem<TData>({
  table,
  enabled,
  disabled,
  labels,
  defaultColumnOrder,
  defaultColumnPinning,
}: {
  table: Table<TData>
  enabled: boolean
  disabled: boolean
  labels?: ProTableToolbarLabels
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}): ProToolbarItem<ProTableToolbarContext<TData>> | undefined {
  if (!enabled) return undefined

  return {
    key: 'columns',
    render: () => (
      <ProTableColumnSettingsButton
        table={table}
        label={labels?.columns ?? 'Columns'}
        disabled={disabled}
        defaultColumnOrder={defaultColumnOrder}
        defaultColumnPinning={defaultColumnPinning}
      />
    ),
  }
}
