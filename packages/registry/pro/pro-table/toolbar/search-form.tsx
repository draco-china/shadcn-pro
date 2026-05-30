'use client'

import type { Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import type * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProTableSearchFormProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
}

/**
 * A standalone search form that can be used separately from the toolbar.
 * Useful when you want to place the search outside the table container.
 */
export function ProTableSearchForm<TData>({
  table,
  searchKey,
  searchPlaceholder = 'Search...',
}: ProTableSearchFormProps<TData>) {
  const column = searchKey ? table.getColumn(searchKey) : undefined
  const value = (column?.getFilterValue() as string) ?? ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    column?.setFilterValue(e.target.value)
  }

  const handleClear = () => {
    column?.setFilterValue('')
  }

  if (!searchKey) return null

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 size-4 text-muted-foreground" />
      <Input
        placeholder={searchPlaceholder}
        value={value}
        onChange={handleChange}
        className="h-9 pl-9 pr-9 w-[200px] lg:w-[300px]"
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
