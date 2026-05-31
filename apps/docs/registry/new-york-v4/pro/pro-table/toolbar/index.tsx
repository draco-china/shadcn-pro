'use client'

import type { Column, ColumnPinningState, Row, Table } from '@tanstack/react-table'
import { AlignJustify, RefreshCw, SlidersHorizontal, X } from 'lucide-react'
import { FacetedFilter } from '@/registry/new-york-v4/pro/pro-fields/faceted-filter'
import {
  ProToolbar,
  type ProToolbarItem,
  type ProToolbarRegion,
} from '@/registry/new-york-v4/pro/pro-toolbar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import type { ProTableColumnMeta, ProTableFilterOption, ProTableSearch, TableSize } from '../types'
import { ProTableColumnSettings } from './column-settings'

export interface ProTableToolbarLabels {
  search?: string
  reset?: string
  refresh?: string
  columns?: string
  density?: string
  densityOptions?: Partial<Record<TableSize, string>>
}

export interface ProTableToolbarContext<TData> {
  table: Table<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
  tableSize: TableSize
}

interface ProTableToolbarProps<TData> {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  search?: ProTableSearch
  filters?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  actions?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  columns?: boolean
  density?: boolean
  refresh?: () => void
  disabled?: boolean
  tableSize?: TableSize
  onTableSizeChange?: (size: TableSize) => void
  labels?: ProTableToolbarLabels
  context: ProTableToolbarContext<TData>
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
  const searchColumn = getSearchColumn(table, search)
  const searchMeta = searchColumn ? getColumnMeta(searchColumn) : undefined
  const searchValue = (searchColumn?.getFilterValue() as string) ?? ''
  const searchPlaceholder = getSearchPlaceholder(search, searchMeta, searchColumn?.id, labels)
  const isFiltered = table.getState().columnFilters.length > 0
  const filterColumns = table.getAllColumns().filter((column) => getColumnMeta(column).filter)
  const toolbarContext = { ...context, tableSize }

  function handleSearchChange(value: string) {
    searchColumn?.setFilterValue(value || undefined)
  }

  const leftItems: ProToolbarItem<ProTableToolbarContext<TData>>[] = [
    ...(searchColumn
      ? [
          {
            key: 'search',
            render: () => (
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) => handleSearchChange(event.target.value)}
                disabled={disabled}
                className="h-8 w-full md:w-[200px]"
              />
            ),
          },
        ]
      : []),
    ...filterColumns.map((column) => {
      const meta = getColumnMeta(column)
      const filter = meta.filter
      return {
        key: `filter-${column.id}`,
        hidden: !filter,
        render: () => {
          if (!filter) return null
          const currentValue = column.getFilterValue() as string | string[] | undefined
          return (
            <FacetedFilter
              options={filter.options}
              placeholder={filter.placeholder ?? column.id}
              multiple={filter.multiple}
              value={currentValue}
              facets={column.getFacetedUniqueValues()}
              onChange={(value) => column.setFilterValue(value)}
              className="w-full justify-start md:w-auto"
            />
          )
        },
      }
    }),
    ...(isFiltered
      ? [
          {
            key: 'reset',
            label: labels?.reset ?? 'Reset',
            icon: <X className="size-4" />,
            variant: 'ghost' as const,
            className: 'h-8 px-2 text-muted-foreground',
            disabled,
            onClick: () => {
              table.resetColumnFilters()
            },
          },
        ]
      : []),
  ]

  const rightItems: ProToolbarItem<ProTableToolbarContext<TData>>[] = [
    ...(actions && actions.length > 0
      ? [...actions, { key: 'actions-separator', separator: true as const }]
      : []),
    ...(refresh
      ? [
          {
            key: 'refresh',
            icon: <RefreshCw size={16} />,
            tooltip: labels?.refresh ?? 'Refresh',
            variant: 'ghost' as const,
            disabled,
            onClick: refresh,
          },
        ]
      : []),
    ...(density && onTableSizeChange
      ? [
          {
            key: 'density',
            icon: <AlignJustify size={16} />,
            tooltip: labels?.density ?? 'Density',
            variant: 'ghost' as const,
            disabled,
            items: (Object.keys(DENSITY_LABELS) as TableSize[]).map((size) => ({
              key: size,
              label: labels?.densityOptions?.[size] ?? DENSITY_LABELS[size],
              onClick: () => onTableSizeChange(size),
            })),
          },
        ]
      : []),
    ...(columns
      ? [
          {
            key: 'columns',
            icon: <SlidersHorizontal size={16} />,
            tooltip: labels?.columns ?? 'Columns',
            'aria-label': labels?.columns ?? 'Columns',
            variant: 'ghost' as const,
            size: 'icon-sm' as const,
            className: 'size-8',
            disabled,
            contentClassName: 'w-[240px] p-0',
            content: () => (
              <ProTableColumnSettings
                table={table}
                defaultColumnOrder={defaultColumnOrder}
                defaultColumnPinning={defaultColumnPinning}
              />
            ),
          },
        ]
      : []),
  ]

  return (
    <ProToolbar
      context={toolbarContext}
      left={mergeToolbarRegion(leftItems, filters)}
      right={{ options: rightItems }}
      className="items-start md:items-center"
    />
  )
}

function mergeToolbarRegion<TData>(
  items: ProToolbarItem<ProTableToolbarContext<TData>>[],
  filters?: ProToolbarItem<ProTableToolbarContext<TData>>[],
): ProToolbarRegion<ProTableToolbarContext<TData>> {
  return {
    className: 'min-w-0 md:flex-1',
    options: [...items, ...(filters ?? [])],
  }
}

function getColumnMeta<TData>(column: Column<TData, unknown>) {
  return (column.columnDef.meta ?? {}) as ProTableColumnMeta
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
  labels?: ProTableToolbarLabels,
) {
  if (typeof search === 'object' && search.placeholder) return search.placeholder
  if (typeof meta?.search === 'object' && meta.search.placeholder) return meta.search.placeholder
  if (labels?.search) return labels.search
  return columnId ? `Search ${columnId}...` : 'Search...'
}
