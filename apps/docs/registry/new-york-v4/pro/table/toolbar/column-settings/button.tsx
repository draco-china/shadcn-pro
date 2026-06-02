'use client'

import type { ColumnPinningState, Table } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'
import { DropdownMenu as DropdownMenuPrimitive, Tooltip as TooltipPrimitive } from 'radix-ui'
import { ProButton } from '@/components/pro/base/button'
import {
  tooltipArrowClassName,
  tooltipContentClassName,
} from '@/components/pro/base/button/classes'
import { dropdownMenuContentClassName } from '@/components/pro/base/dropdown-menu/classes'
import { cn } from '@/lib/utils'
import { columnSettingsContentClassName } from '../classes'
import { ProTableColumnSettings } from './content'

export function ProTableColumnSettingsButton<TData>({
  table,
  label,
  disabled,
  defaultColumnOrder,
  defaultColumnPinning,
}: {
  table: Table<TData>
  label: string
  disabled?: boolean
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <DropdownMenuPrimitive.Trigger asChild>
            <ProButton
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              prefix={<SlidersHorizontal size={16} />}
              disabled={disabled}
            />
          </DropdownMenuPrimitive.Trigger>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className={tooltipContentClassName}>
            {label}
            <TooltipPrimitive.Arrow className={tooltipArrowClassName} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={4}
          className={cn(dropdownMenuContentClassName, columnSettingsContentClassName)}
        >
          <ProTableColumnSettings
            table={table}
            defaultColumnOrder={defaultColumnOrder}
            defaultColumnPinning={defaultColumnPinning}
          />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
