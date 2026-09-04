'use client'

import type { Column, ColumnFiltersState, Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProButton, type ProButtonSize } from '../base/button'
import { Input } from '../base/fields/input'
import { Select } from '../base/fields/select'

/** Draft column search controls with explicit apply and reset actions. */
export function ProTableSearchBar<TData>({
  table,
  size,
  disabled = false,
}: {
  table: Table<TData>
  size?: ProButtonSize
  disabled?: boolean
}) {
  const buttonSize = size ?? 'sm'
  const searchColumns = getTableSearchColumns(table)
  const appliedFilters = table.getState().columnFilters
  const [draftFilters, setDraftFilters] = useState<ColumnFiltersState>(appliedFilters)
  const filterColumns = table
    .getAllColumns()
    .filter((column) => column.columnDef.meta?.filter !== undefined)

  useEffect(() => setDraftFilters(appliedFilters), [appliedFilters])

  if (searchColumns.length === 0 && filterColumns.length === 0) return null

  const setDraftFilterValue = (columnId: string, value: unknown) => {
    setDraftFilters((current) => {
      const next = current.filter((filter) => filter.id !== columnId)
      if (isEmptyFilterValue(value)) return next
      return [...next, { id: columnId, value }]
    })
  }
  const applyFilters = () => table.setColumnFilters(draftFilters)
  const hasConditions = draftFilters.length > 0 || appliedFilters.length > 0

  return (
    <search
      className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between"
      onKeyDown={(event) => {
        if (
          event.key !== 'Enter' ||
          !(event.target instanceof HTMLInputElement) ||
          !event.target.hasAttribute('data-pro-table-search-input')
        ) {
          return
        }
        event.preventDefault()
        applyFilters()
      }}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-start gap-2 md:items-center">
        {searchColumns.map((column) => {
          const rawValue = draftFilters.find((filter) => filter.id === column.id)?.value
          const value = typeof rawValue === 'string' ? rawValue : ''
          const configuredSearch = column.columnDef.meta?.search
          const placeholder = getSearchPlaceholder(
            column,
            typeof configuredSearch === 'object' ? configuredSearch.placeholder : undefined,
          )

          return (
            <Input
              key={`search-${column.id}`}
              data-pro-table-search-input=""
              aria-label={placeholder}
              placeholder={placeholder}
              value={value}
              onChange={(event) => setDraftFilterValue(column.id, event.target.value)}
              disabled={disabled}
              allowClear={false}
              inputClassName="h-8"
              className="w-full md:w-[200px]"
            />
          )
        })}
        {filterColumns.map((column) => {
          const filter = column.columnDef.meta?.filter
          if (!filter) return null
          const rawValue = draftFilters.find((item) => item.id === column.id)?.value
          const values = Array.isArray(rawValue)
            ? rawValue.filter((item): item is string => typeof item === 'string')
            : []

          return (
            <Select
              key={`filter-${column.id}`}
              options={filter.options.map((option) => {
                const count = column.getFacetedUniqueValues().get(option.value)
                return {
                  ...option,
                  label:
                    count === undefined ? (
                      option.label
                    ) : (
                      <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                        <span className="truncate">{option.label}</span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {count}
                        </span>
                      </span>
                    ),
                }
              })}
              placeholder={filter.placeholder ?? column.id}
              multiple={filter.multiple}
              searchable
              allowClear
              disabled={disabled}
              value={getFilterValue(rawValue, values)}
              onChange={(value) => setDraftFilterValue(column.id, value)}
              className="h-8 w-full md:w-[180px]"
            />
          )
        })}
      </div>
      <div className="flex shrink-0 items-center justify-end gap-2">
        {hasConditions && (
          <ProButton
            type="button"
            variant="ghost"
            size={buttonSize}
            disabled={disabled}
            onClick={() => {
              setDraftFilters([])
              table.resetColumnFilters()
            }}
          >
            <X />
            Reset
          </ProButton>
        )}
        <ProButton type="button" size={buttonSize} disabled={disabled} onClick={applyFilters}>
          <Search />
          Search
        </ProButton>
      </div>
    </search>
  )
}

function getTableSearchColumns<TData>(table: Table<TData>) {
  return table
    .getAllLeafColumns()
    .filter(
      (column) =>
        column.columnDef.meta?.search !== undefined && column.columnDef.meta.search !== false,
    )
}

function getSearchPlaceholder<TData>(
  column: Column<TData, unknown>,
  configuredPlaceholder: string | undefined,
) {
  return configuredPlaceholder ?? `Search ${column.id}...`
}

function getFilterValue(rawValue: unknown, values: string[]) {
  if (typeof rawValue === 'string') return rawValue
  if (Array.isArray(rawValue) && values.length === rawValue.length) return values
  return undefined
}

function isEmptyFilterValue(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  )
}
