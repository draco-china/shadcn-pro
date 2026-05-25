'use client'

import type { ColumnPinningState, Table } from '@tanstack/react-table'
import { AlignJustify, RefreshCw, SlidersHorizontal } from 'lucide-react'
import type * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { TableSize } from '../types'
import { ProTableColumnSettings } from './column-settings'

interface ProTableToolbarProps<TData> {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  filterRender?: React.ReactNode
  toolBarRender?: () => React.ReactNode[]
  searchKey?: string
  searchPlaceholder?: string
  showColumnToggle?: boolean
  onRefresh?: () => void
  disabled?: boolean
  tableSize?: TableSize
  onTableSizeChange?: (size: TableSize) => void
}

const DENSITY_LABELS: Record<TableSize, string> = {
  default: 'Comfortable',
  middle: 'Medium',
  compact: 'Compact',
}

export function ProTableToolbar<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
  filterRender,
  toolBarRender,
  searchKey,
  searchPlaceholder = 'Search...',
  showColumnToggle = true,
  onRefresh,
  disabled = false,
  tableSize = 'default',
  onTableSizeChange,
}: ProTableToolbarProps<TData>) {
  const actions = toolBarRender?.() ?? []

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              disabled={disabled}
              className="h-8 w-full sm:w-[200px]"
            />
          )}
          {filterRender}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {actions.length > 0 && (
            <>
              <div className="flex flex-wrap items-center gap-2">{actions}</div>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
            </>
          )}
          {onRefresh && (
            <ToolbarIcon label="Refresh" disabled={disabled} onClick={onRefresh}>
              <RefreshCw size={16} />
            </ToolbarIcon>
          )}
          {onTableSizeChange && (
            <DensityMenu
              disabled={disabled}
              tableSize={tableSize}
              onTableSizeChange={onTableSizeChange}
            />
          )}
          {showColumnToggle && (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={disabled}>
                      <SlidersHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Columns</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-[240px] p-0">
                <ProTableColumnSettings
                  table={table}
                  defaultColumnOrder={defaultColumnOrder}
                  defaultColumnPinning={defaultColumnPinning}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

function ToolbarIcon({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function DensityMenu({
  disabled,
  tableSize,
  onTableSizeChange,
}: {
  disabled: boolean
  tableSize: TableSize
  onTableSizeChange: (size: TableSize) => void
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={disabled}>
              <AlignJustify size={16} />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Density</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Table Density</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(DENSITY_LABELS) as TableSize[]).map((size) => (
          <DropdownMenuCheckboxItem
            key={size}
            checked={tableSize === size}
            onCheckedChange={() => onTableSizeChange(size)}
          >
            {DENSITY_LABELS[size]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
