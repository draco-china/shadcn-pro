'use client'

import type { ColumnPinningState, Table } from '@tanstack/react-table'
import { RotateCcw } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { ProSeparator } from '@/components/pro/base/separator'
import {
  columnSettingsHeaderClassName,
  columnSettingsResetClassName,
  columnSettingsResetIconClassName,
  columnSettingsSeparatorClassName,
  columnSettingsTitleClassName,
} from '../classes'

export function ColumnSettingsHeader<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
  canPinColumns,
}: {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  canPinColumns: boolean
}) {
  return (
    <>
      <div className={columnSettingsHeaderClassName}>
        <span className={columnSettingsTitleClassName}>Columns</span>
        <ProButton
          type="button"
          variant="ghost"
          size="xs"
          className={columnSettingsResetClassName}
          onClick={() => {
            table.resetColumnVisibility()
            table.setColumnOrder(defaultColumnOrder)
            if (canPinColumns) table.setColumnPinning(defaultColumnPinning)
          }}
        >
          <RotateCcw size={12} className={columnSettingsResetIconClassName} />
          Reset
        </ProButton>
      </div>
      <ProSeparator className={columnSettingsSeparatorClassName} />
    </>
  )
}
