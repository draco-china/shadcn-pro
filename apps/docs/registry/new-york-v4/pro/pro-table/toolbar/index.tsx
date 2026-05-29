'use client'

import type { ColumnPinningState, Table } from '@tanstack/react-table'
import { AlignJustify, RefreshCw, SlidersHorizontal, X } from 'lucide-react'
import * as React from 'react'

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
import { FacetedFilter } from '@/registry/new-york-v4/pro/pro-fields/faceted-filter'
import type { ProTableFilterOption, TableSize } from '../types'
import { ProTableColumnSettings } from './column-settings'

interface ProTableToolbarProps<TData> {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  filterRender?: React.ReactNode | ((table: Table<TData>) => React.ReactNode)
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

/** Auto cell renderer for columns with meta.filters */
export function AutoFilterCell({
  value,
  filters,
  variant = 'badge',
}: {
  value: string | string[] | undefined
  filters: ProTableFilterOption[]
  variant?: 'badge' | 'text'
}) {
  const values = Array.isArray(value) ? value : value ? [value] : []
  const labels = values.map(
    (v) => filters.find((f) => f.value === v)?.label ?? v,
  )

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
  const isFiltered = table.getState().columnFilters.length > 0

  // Columns with meta.filters — auto-render FacetedFilter
  const filterColumns = table.getAllColumns().filter(
    (col) => (col.columnDef.meta as { filters?: unknown })?.filters,
  )

  const resolvedFilterRender =
    typeof filterRender === 'function' ? filterRender(table) : filterRender

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {searchKey && (
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(e) =>
                table.getColumn(searchKey)?.setFilterValue(e.target.value || undefined)
              }
              className="h-8 w-[200px] lg:w-[250px]"
              disabled={disabled}
            />
          )}

          {/* Auto-rendered FacetedFilters from meta.filters */}
          {filterColumns.map((col) => {
            const meta = col.columnDef.meta as {
              filters: ProTableFilterOption[]
              filterPlaceholder?: string
              filterMode?: 'single' | 'multi'
            }
            const currentValue = col.getFilterValue() as string | string[] | undefined
            return (
              <FacetedFilter
                key={col.id}
                options={meta.filters}
                placeholder={meta.filterPlaceholder ?? col.id}
                mode={meta.filterMode ?? 'multi'}
                value={currentValue}
                facets={col.getFacetedUniqueValues()}
                onChange={(val) => col.setFilterValue(val)}
              />
            )
          })}

          {/* Custom filterRender */}
          {resolvedFilterRender}

          {/* Reset button */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {actions.map((action, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static toolbar actions
            <React.Fragment key={i}>{action}</React.Fragment>
          ))}

          {onRefresh && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={onRefresh}
                  disabled={disabled}
                  aria-label="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh</TooltipContent>
            </Tooltip>
          )}

          {onTableSizeChange && (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={disabled}
                      aria-label="Density"
                    >
                      <AlignJustify className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Density</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Row density</DropdownMenuLabel>
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
          )}

          {showColumnToggle && (
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={disabled}
                      aria-label="Column settings"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Column settings</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" className="w-52">
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
