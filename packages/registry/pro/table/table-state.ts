'use client'

import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import type {
  ColumnDef,
  ColumnPinningState,
  FilterFn,
  OnChangeFn,
  Row,
  SortingFn,
  Table,
} from '@tanstack/react-table'
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import type { ProTablePinnedColumnOffsets } from './body'
import { getSystemColumnPinning } from './columns'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export interface ProTableTableOptions {
  stickyHeader?: boolean
  pinning?:
    | false
    | {
        value?: ColumnPinningState
        onChange?: (value: ColumnPinningState) => void
      }
}

export interface ColumnFilterMeta<TData> {
  options: Array<{
    label: string
    value: string
  }>
  placeholder?: string
  multiple?: boolean
  onFilter?: (value: string, record: TData) => boolean
}

function getColumnDefId<TData, TValue>(column: ColumnDef<TData, TValue>, index: number) {
  if (column.id) return column.id
  if ('accessorKey' in column && typeof column.accessorKey === 'string') return column.accessorKey
  return String(index)
}

function getLeafColumnIds<TData, TValue>(columns: ColumnDef<TData, TValue>[]): string[] {
  return columns.flatMap((column, index) =>
    'columns' in column && Array.isArray(column.columns)
      ? getLeafColumnIds(column.columns)
      : getColumnDefId(column, index),
  )
}

function getPinnedColumnIds<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  side: 'left' | 'right',
): string[] {
  return columns.flatMap((column, index) => {
    if ('columns' in column && Array.isArray(column.columns)) {
      return getPinnedColumnIds(column.columns, side)
    }
    const id = getColumnDefId(column, index)
    const pinned = column.meta?.pinned ?? getSystemColumnPinning(id)
    return pinned === side ? [id] : []
  })
}

export function useProTableColumnState<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  tableOptions: ProTableTableOptions | undefined,
) {
  const pinningEnabled = tableOptions?.pinning !== false
  const defaultColumnOrder = useMemo(() => getLeafColumnIds(columns), [columns])
  const defaultColumnPinning = useMemo(
    () =>
      pinningEnabled
        ? {
            left: getPinnedColumnIds(columns, 'left'),
            right: getPinnedColumnIds(columns, 'right'),
          }
        : {},
    [columns, pinningEnabled],
  )
  const defaultColumnPinningKey = `${defaultColumnPinning.left?.join('\0') ?? ''}\x01${defaultColumnPinning.right?.join('\0') ?? ''}`
  const defaultColumnPinningRef = useRef(defaultColumnPinning)
  defaultColumnPinningRef.current = defaultColumnPinning
  const controlledColumnPinning =
    typeof tableOptions?.pinning === 'object' ? tableOptions.pinning.value : undefined
  const [columnOrder, setColumnOrder] = useState<string[]>(defaultColumnOrder)
  const [internalColumnPinning, setInternalColumnPinning] =
    useState<ColumnPinningState>(defaultColumnPinning)
  const columnPinning =
    typeof tableOptions?.pinning === 'object' && tableOptions.pinning.value
      ? tableOptions.pinning.value
      : internalColumnPinning

  useEffect(() => {
    setColumnOrder((current) => {
      const remainingIds = new Set(defaultColumnOrder)
      const next = [...current.filter((id) => remainingIds.delete(id)), ...remainingIds]
      return next.length === current.length && next.every((id, index) => id === current[index])
        ? current
        : next
    })
  }, [defaultColumnOrder])
  useEffect(() => {
    if (!pinningEnabled || controlledColumnPinning) return
    setInternalColumnPinning(defaultColumnPinningRef.current)
  }, [controlledColumnPinning, defaultColumnPinningKey, pinningEnabled])

  const handleColumnPinningChange = useCallback<OnChangeFn<ColumnPinningState>>(
    (updater) => {
      const next = typeof updater === 'function' ? updater(columnPinning) : updater
      if (typeof tableOptions?.pinning === 'object') tableOptions.pinning.onChange?.(next)
      if (!(typeof tableOptions?.pinning === 'object' && tableOptions.pinning.value)) {
        setInternalColumnPinning(next)
      }
    },
    [columnPinning, tableOptions?.pinning],
  )

  return {
    columnOrder,
    setColumnOrder,
    columnPinning,
    handleColumnPinningChange,
    defaultColumnOrder,
    defaultColumnPinning,
    pinningEnabled,
  }
}

export function withProTableColumnDefaults<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): ColumnDef<TData, TValue>[] {
  return columns.map((column, index) => {
    const children =
      'columns' in column && Array.isArray(column.columns)
        ? withProTableColumnDefaults(column.columns)
        : undefined
    const filter = column.meta?.filter
    const columnId = getColumnDefId(column, index)
    const search = column.meta?.search
    const shouldApplyFilter = filter && column.filterFn === undefined
    const shouldApplySearchFilter = search && !filter && column.filterFn === undefined
    const shouldApplyFuzzySort = search && column.sortingFn === undefined
    const systemPinned = getSystemColumnPinning(columnId)
    const fixedSize = column.size ?? (systemPinned ? 32 : undefined)

    if (
      !children &&
      !shouldApplyFilter &&
      !shouldApplySearchFilter &&
      !shouldApplyFuzzySort &&
      !systemPinned &&
      fixedSize === undefined
    ) {
      return column
    }

    return {
      ...column,
      ...(children ? { columns: children } : {}),
      ...(systemPinned
        ? {
            enableHiding: column.enableHiding ?? false,
            meta: {
              pinned: systemPinned,
              ...column.meta,
              ...(fixedSize === undefined ? {} : { __proTableFixedSize: fixedSize }),
              className: cn('w-8', column.meta?.className),
            },
          }
        : fixedSize === undefined
          ? {}
          : { meta: { ...column.meta, __proTableFixedSize: fixedSize } }),
      ...(shouldApplyFilter
        ? {
            filterFn: getColumnFilterFn(filter),
          }
        : {}),
      ...(shouldApplySearchFilter
        ? {
            filterFn: ((row, columnId, filterValue, addMeta) => {
              const value = String(filterValue ?? '')
              if (!value) return true

              const itemRank = rankItem(row.getValue(columnId), value)
              addMeta({ itemRank })
              return itemRank.passed
            }) satisfies FilterFn<TData>,
          }
        : {}),
      ...(shouldApplyFuzzySort
        ? {
            sortingFn: ((rowA, rowB, columnId) => {
              const rankA = rowA.columnFiltersMeta[columnId]?.itemRank
              const rankB = rowB.columnFiltersMeta[columnId]?.itemRank

              if (rankA && rankB) {
                const rankSort = compareItems(rankA, rankB)
                if (rankSort !== 0) return rankSort
              }

              return collator.compare(
                String(rowA.getValue(columnId) ?? ''),
                String(rowB.getValue(columnId) ?? ''),
              )
            }) satisfies SortingFn<TData>,
          }
        : {}),
    }
  })
}

function getColumnFilterFn<TData>(filter: ColumnFilterMeta<TData>) {
  if (filter.onFilter) {
    return ((row, _columnId, filterValue) => {
      if (filterValue === undefined || filterValue === null || filterValue === '') return true
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) return true
        return filterValue.some((value) => filter.onFilter?.(String(value), row.original))
      }
      return !!filter.onFilter?.(String(filterValue), row.original)
    }) satisfies FilterFn<TData>
  }

  if (filter.multiple) {
    return ((row, columnId, filterValue) => {
      if (filterValue === undefined || filterValue === null || filterValue === '') return true
      const rowValue = row.getValue(columnId)
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) return true
        return filterValue.includes(rowValue)
      }
      return filterValue === rowValue
    }) satisfies FilterFn<TData>
  }

  return 'equals'
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
})

export function sortRowsByRank<TData>(rows: Row<TData>[], columnId: string) {
  return [...rows].sort((rowA, rowB) => {
    const rankA = rowA.columnFiltersMeta[columnId]?.itemRank
    const rankB = rowB.columnFiltersMeta[columnId]?.itemRank

    if (rankA && rankB) {
      const rankSort = compareItems(rankA, rankB)
      if (rankSort !== 0) return rankSort
    }

    if (rankA) return -1
    if (rankB) return 1
    return rowA.index - rowB.index
  })
}

export function useProTablePinnedColumnOffsets<TData>(
  table: Table<TData>,
  tableRef: RefObject<HTMLTableElement | null>,
  dragSort: boolean,
): ProTablePinnedColumnOffsets {
  const [offsets, setOffsets] = useState<ProTablePinnedColumnOffsets>(() =>
    getInitialPinnedColumnOffsets(table, dragSort),
  )
  const visibleColumnKey = table
    .getVisibleLeafColumns()
    .map((column) => column.id)
    .join('\0')
  const leftPinnedKey = (table.getState().columnPinning.left ?? []).join('\0')
  const rightPinnedKey = (table.getState().columnPinning.right ?? []).join('\0')
  const pinnedSizeKey = [
    ...table.getLeftVisibleLeafColumns(),
    ...table.getRightVisibleLeafColumns(),
  ]
    .map((column) => `${column.id}:${column.columnDef.meta?.__proTableFixedSize ?? 'auto'}`)
    .join('\0')

  useIsomorphicLayoutEffect(() => {
    const tableElement = tableRef.current
    if (!tableElement) return
    const measuredColumnIds = new Set(
      [...table.getLeftVisibleLeafColumns(), ...table.getRightVisibleLeafColumns()]
        .filter((column) => column.columnDef.meta?.__proTableFixedSize === undefined)
        .map((column) => column.id),
    )

    const updateOffsets = () => {
      const widths = new Map<string, number>()

      for (const element of tableElement.querySelectorAll<HTMLElement>(
        'thead tr:last-child [data-pro-table-column-id]',
      )) {
        const columnId = element.dataset.proTableColumnId
        if (!columnId || !measuredColumnIds.has(columnId) || widths.has(columnId)) continue
        widths.set(columnId, element.getBoundingClientRect().width)
      }

      const dragWidth = dragSort ? 32 : 0
      const next: ProTablePinnedColumnOffsets = { left: {}, right: {}, dragWidth }
      let left = dragWidth

      for (const column of table.getLeftVisibleLeafColumns()) {
        next.left[column.id] = left
        left +=
          column.columnDef.meta?.__proTableFixedSize ?? widths.get(column.id) ?? column.getSize()
      }

      let right = 0
      const rightColumns = table.getRightVisibleLeafColumns()
      for (let index = rightColumns.length - 1; index >= 0; index -= 1) {
        const column = rightColumns[index]
        next.right[column.id] = right
        right +=
          column.columnDef.meta?.__proTableFixedSize ?? widths.get(column.id) ?? column.getSize()
      }

      setOffsets((current) => (arePinnedColumnOffsetsEqual(current, next) ? current : next))
    }

    updateOffsets()
    if (typeof ResizeObserver === 'undefined' || measuredColumnIds.size === 0) return undefined

    let frame = 0
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateOffsets)
    })
    for (const element of tableElement.querySelectorAll<HTMLElement>(
      'thead tr:last-child [data-pro-table-column-id]',
    )) {
      const columnId = element.dataset.proTableColumnId
      if (columnId && measuredColumnIds.has(columnId)) observer.observe(element)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [dragSort, leftPinnedKey, pinnedSizeKey, rightPinnedKey, table, tableRef, visibleColumnKey])

  return offsets
}

function getInitialPinnedColumnOffsets<TData>(table: Table<TData>, dragSort: boolean) {
  const offsets: ProTablePinnedColumnOffsets = {
    left: {},
    right: {},
    dragWidth: dragSort ? 32 : 0,
  }
  let left = offsets.dragWidth
  for (const column of table.getLeftVisibleLeafColumns()) {
    offsets.left[column.id] = left
    left += column.columnDef.meta?.__proTableFixedSize ?? column.getSize()
  }

  let right = 0
  const rightColumns = table.getRightVisibleLeafColumns()
  for (let index = rightColumns.length - 1; index >= 0; index -= 1) {
    const column = rightColumns[index]
    offsets.right[column.id] = right
    right += column.columnDef.meta?.__proTableFixedSize ?? column.getSize()
  }
  return offsets
}

function arePinnedColumnOffsetsEqual(
  current: ProTablePinnedColumnOffsets,
  next: ProTablePinnedColumnOffsets,
) {
  for (const side of ['left', 'right'] as const) {
    let currentCount = 0
    let nextCount = 0

    for (const [columnId, offset] of Object.entries(current[side])) {
      currentCount += 1
      if (next[side][columnId] !== offset) return false
    }

    for (const [columnId, offset] of Object.entries(next[side])) {
      nextCount += 1
      if (current[side][columnId] !== offset) return false
    }

    if (currentCount !== nextCount) return false
  }

  return current.dragWidth === next.dragWidth
}

/** Props accepted by ProTable. */
