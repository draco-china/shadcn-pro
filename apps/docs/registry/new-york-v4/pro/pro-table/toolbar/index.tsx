'use client'

import type { Column, ColumnPinningState, Table } from '@tanstack/react-table'
import { AlignJustify, RefreshCw, SlidersHorizontal, X } from 'lucide-react'
import type * as React from 'react'
import { FacetedFilter } from '@/registry/new-york-v4/pro/pro-fields/faceted-filter'
import { Badge } from '@/components/ui/badge'
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
import type { ProTableColumnMeta, ProTableFilterOption, ProTableSearch, TableSize } from '../types'
import { ProTableColumnSettings } from './column-settings'

interface ProTableToolbarProps<TData> {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  search?: ProTableSearch
  actions?: React.ReactNode[]
  columns?: boolean
  density?: boolean
  refresh?: () => void
  disabled?: boolean
  tableSize?: TableSize
  onTableSizeChange?: (size: TableSize) => void
}

const DENSITY_LABELS: Record<TableSize, string> = {
  default: 'Comfortable',
  middle: 'Medium',
  compact: 'Compact',
}

/** Auto cell renderer for columns with meta.filter */
export function AutoFilterCell({
  value,
  options,
  variant = 'badge',
}: {
  value: string | string[] | undefined
  options: ProTableFilterOption[]
  variant?: 'badge' | 'text'
}) {
  const values = Array.isArray(value) ? value : value ? [value] : []
  const labels = values.map((v) => options.find((option) => option.value === v)?.label ?? v)

  if (labels.length === 0) return <span className="text-muted-foreground">—</span>

  if (variant === 'text') {
    return <span>{labels.join(', ')}</span>
  }

  return (
    <div className="flex flex-wrap gap-1">
      {labels.map((label) => (
        <Badge key={label} variant="secondary" className="rounded-sm font-normal">
          {label}
        </Badge>
      ))}
    </div>
  )
}

export function ProTableToolbar<TData>({
  table,
  defaultColumnOrder,
  defaultColumnPinning,
  search,
  actions,
  columns = true,
  density = true,
  refresh,
  disabled = false,
  tableSize = 'default',
  onTableSizeChange,
}: ProTableToolbarProps<TData>) {
  const searchColumn = getSearchColumn(table, search)
  const searchMeta = searchColumn ? getColumnMeta(searchColumn) : undefined
  const searchValue = (searchColumn?.getFilterValue() as string) ?? ''
  const searchPlaceholder = getSearchPlaceholder(search, searchMeta, searchColumn?.id)
  const isFiltered = table.getState().columnFilters.length > 0
  const filterColumns = table.getAllColumns().filter((column) => getColumnMeta(column).filter)

  function handleSearchChange(value: string) {
    searchColumn?.setFilterValue(value || undefined)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {searchColumn && (
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => handleSearchChange(event.target.value)}
              disabled={disabled}
              className="h-8 w-full sm:w-[200px]"
            />
          )}
          {filterColumns.map((column) => {
            const meta = getColumnMeta(column)
            const filter = meta.filter
            if (!filter) return null
            const currentValue = column.getFilterValue() as string | string[] | undefined
            return (
              <FacetedFilter
                key={column.id}
                options={filter.options}
                placeholder={filter.placeholder ?? column.id}
                mode={filter.mode ?? 'multi'}
                value={currentValue}
                facets={column.getFacetedUniqueValues()}
                onChange={(value) => column.setFilterValue(value)}
              />
            )
          })}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              onClick={() => {
                table.resetColumnFilters()
              }}
              disabled={disabled}
            >
              Reset
              <X className="ml-1 size-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          {actions && actions.length > 0 && (
            <>
              <div className="flex flex-wrap items-center gap-2">{actions}</div>
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
            </>
          )}
          {refresh && (
            <ToolbarIcon label="Refresh" disabled={disabled} onClick={refresh}>
              <RefreshCw size={16} />
            </ToolbarIcon>
          )}
          {density && onTableSizeChange && (
            <DensityMenu
              disabled={disabled}
              tableSize={tableSize}
              onTableSizeChange={onTableSizeChange}
            />
          )}
          {columns && (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8" disabled={disabled}>
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
          className="size-8"
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
            <Button variant="ghost" size="icon" className="size-8" disabled={disabled}>
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

function getColumnMeta<TData>(column: Column<TData, unknown>) {
  return column.columnDef.meta as ProTableColumnMeta
}

function getSearchColumn<TData>(table: Table<TData>, search: ProTableSearch | undefined) {
  if (search === false) return undefined
  if (typeof search === 'string') return table.getColumn(search)
  if (typeof search === 'object') return table.getColumn(search.columnId)
  return table.getAllLeafColumns().find((column) => Boolean(getColumnMeta(column).search))
}

function getSearchPlaceholder(
  search: ProTableSearch | undefined,
  meta: ProTableColumnMeta | undefined,
  columnId: string | undefined,
) {
  if (typeof search === 'object' && search.placeholder) return search.placeholder
  if (typeof meta?.search === 'object' && meta.search.placeholder) return meta.search.placeholder
  return columnId ? `Search ${columnId}...` : 'Search...'
}
