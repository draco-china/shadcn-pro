'use client'

import type { Column, Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import type * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ProTableColumnMeta, ProTableSearch } from '../types'

interface ProTableSearchFormProps<TData> {
  table: Table<TData>
  search?: ProTableSearch
}

/**
 * Standalone search form driven by the first column with `meta.search`.
 */
export function ProTableSearchForm<TData>({ table, search }: ProTableSearchFormProps<TData>) {
  const column = getSearchColumn(table, search)
  const meta = column ? getColumnMeta(column) : undefined
  const value = (column?.getFilterValue() as string) ?? ''

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    column?.setFilterValue(event.target.value || undefined)
  }

  const handleClear = () => {
    column?.setFilterValue(undefined)
  }

  if (!column) return null

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 size-4 text-muted-foreground" />
      <Input
        placeholder={getSearchPlaceholder(search, meta, column.id)}
        value={value}
        onChange={handleChange}
        className="h-9 w-[200px] pl-9 pr-9 lg:w-[300px]"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 size-7 p-0"
          onClick={handleClear}
        >
          <X className="size-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
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
  columnId: string,
) {
  if (typeof search === 'object' && search.placeholder) return search.placeholder
  if (typeof meta?.search === 'object' && meta.search.placeholder) return meta.search.placeholder
  return `Search ${columnId}...`
}
