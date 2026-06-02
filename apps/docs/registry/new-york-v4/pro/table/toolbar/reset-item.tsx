import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { tableResetClassName, tableResetIconClassName } from './classes'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'

export function getToolbarResetItem<TData>({
  table,
  disabled,
  labels,
}: {
  table: Table<TData>
  disabled: boolean
  labels?: ProTableToolbarLabels
}): ProToolbarItem<ProTableToolbarContext<TData>> | undefined {
  if (!table.getState().columnFilters.length) return undefined

  return {
    key: 'reset',
    label: labels?.reset ?? 'Reset',
    icon: <X className={tableResetIconClassName} />,
    variant: 'ghost',
    className: tableResetClassName,
    disabled,
    onClick: () => {
      table.resetColumnFilters()
    },
  }
}
