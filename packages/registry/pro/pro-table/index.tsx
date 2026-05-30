'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  functionalUpdate,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type SortingState,
  type Table as TanStackTable,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import * as React from 'react'

import { TableBody, TableHeader } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ProTablePagination } from './pagination'
import { ProTableBody } from './table/body'
import { ProTableHeader } from './table/header'
import { getDefaultColumnPinning, getLeafColumnIds, reorderDataByRows } from './table/utils'
import { ProTableToolbar } from './toolbar'
import { ProTableBulkActions } from './toolbar/bulk-actions'
import { cellPadding, type TableSize } from './types'

const tableScrollbarClassName =
  '[scrollbar-gutter:auto] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35'

export interface ProTableRenderContext<TData> {
  table: TanStackTable<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
}

export type ProTableLayout = 'full' | 'auto'

export type ProTablePaginationState = PaginationState & { total?: number }

export interface ProTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  header?: React.ReactNode | ((context: ProTableRenderContext<TData>) => React.ReactNode)
  filterRender?: React.ReactNode
  toolBarRender?: () => React.ReactNode[]
  bulkActionRender?: (context: ProTableRenderContext<TData>) => React.ReactNode
  bulkActionEntityName?: string
  searchKey?: string
  searchPlaceholder?: string
  showColumnToggle?: boolean
  onRefresh?: () => void
  pageSizeOptions?: number[]
  dragSort?: boolean
  onDragSortEnd?: (newData: TData[]) => void
  rowKey?: keyof TData
  loading?: boolean
  loadingRows?: number
  emptyText?: React.ReactNode
  emptyIcon?: React.ReactNode
  showPagination?: boolean
  layout?: ProTableLayout
  stickyHeader?: boolean
  columnPinning?: ColumnPinningState
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>
  className?: string
  /** Controlled pagination state. Pair with `onPaginationChange`. When provided, server-side pagination is assumed. */
  pagination?: ProTablePaginationState
  onPaginationChange?: OnChangeFn<ProTablePaginationState>
  /** Controlled sorting state. Pair with `onSortingChange`. */
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  /** Controlled column filters state. Pair with `onColumnFiltersChange`. */
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  /** Controlled global filter value. Pair with `onGlobalFilterChange`. */
  globalFilter?: string
  onGlobalFilterChange?: OnChangeFn<string>
}

export function ProTable<TData, TValue>({
  columns,
  data: initialData,
  header,
  filterRender,
  toolBarRender,
  bulkActionRender,
  bulkActionEntityName,
  searchKey,
  searchPlaceholder = 'Search...',
  showColumnToggle = true,
  onRefresh,
  pageSizeOptions,
  dragSort = false,
  onDragSortEnd,
  rowKey,
  loading = false,
  loadingRows = 5,
  emptyText = 'No data',
  emptyIcon,
  showPagination = true,
  layout = 'full',
  stickyHeader = true,
  columnPinning,
  onColumnPinningChange,
  className,
  pagination: paginationProp,
  onPaginationChange,
  sorting: sortingProp,
  onSortingChange: onSortingChangeProp,
  columnFilters: columnFiltersProp,
  onColumnFiltersChange: onColumnFiltersChangeProp,
  globalFilter: globalFilterProp,
  onGlobalFilterChange,
}: ProTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>([])
  const columnFilters = columnFiltersProp ?? internalColumnFilters
  const setColumnFilters = React.useCallback<OnChangeFn<ColumnFiltersState>>(
    (updater) => {
      if (columnFiltersProp === undefined) {
        setInternalColumnFilters((current) => functionalUpdate(updater, current))
      }
      onColumnFiltersChangeProp?.(updater)
    },
    [columnFiltersProp, onColumnFiltersChangeProp],
  )
  const [internalGlobalFilter, setInternalGlobalFilter] = React.useState<string>('')
  const globalFilter = globalFilterProp ?? internalGlobalFilter
  const setGlobalFilter = React.useCallback<OnChangeFn<string>>(
    (updater) => {
      if (globalFilterProp === undefined) {
        setInternalGlobalFilter((current) => functionalUpdate(updater, current))
      }
      onGlobalFilterChange?.(updater)
    },
    [globalFilterProp, onGlobalFilterChange],
  )
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const sorting = sortingProp ?? internalSorting
  const setSorting = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      if (sortingProp === undefined) {
        setInternalSorting((current) => functionalUpdate(updater, current))
      }
      onSortingChangeProp?.(updater)
    },
    [onSortingChangeProp, sortingProp],
  )
  const manualPagination = paginationProp !== undefined
  const manualSorting =
    manualPagination && (sortingProp !== undefined || onSortingChangeProp !== undefined)
  const manualFiltering =
    manualPagination &&
    (columnFiltersProp !== undefined ||
      onColumnFiltersChangeProp !== undefined ||
      globalFilterProp !== undefined ||
      onGlobalFilterChange !== undefined)

  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const pagination = paginationProp ?? internalPagination
  const setPagination = React.useCallback<OnChangeFn<ProTablePaginationState>>(
    (updater) => {
      if (paginationProp === undefined) {
        setInternalPagination((current) => functionalUpdate(updater, current))
      }
      onPaginationChange?.(updater)
    },
    [onPaginationChange, paginationProp],
  )
  const [tableSize, setTableSize] = React.useState<TableSize>('default')
  const defaultColumnOrder = React.useMemo(() => getLeafColumnIds(columns), [columns])
  const defaultColumnPinning = React.useMemo(() => getDefaultColumnPinning(columns), [columns])
  const defaultColumnOrderKey = defaultColumnOrder.join('\0')
  const defaultColumnPinningKey = `${defaultColumnPinning.left?.join('\0') ?? ''}\u0001${defaultColumnPinning.right?.join('\0') ?? ''}`
  const [columnOrder, setColumnOrder] = React.useState<string[]>(defaultColumnOrder)
  const [internalColumnPinning, setInternalColumnPinning] =
    React.useState<ColumnPinningState>(defaultColumnPinning)
  const currentColumnPinning = columnPinning ?? internalColumnPinning

  React.useEffect(() => setData(initialData), [initialData])
  React.useEffect(() => {
    setColumnOrder((current) => [
      ...current.filter((id) => defaultColumnOrder.includes(id)),
      ...defaultColumnOrder.filter((id) => !current.includes(id)),
    ])
  }, [defaultColumnOrderKey])
  React.useEffect(() => {
    if (columnPinning) return
    setInternalColumnPinning(defaultColumnPinning)
  }, [columnPinning, defaultColumnPinningKey])

  const handleColumnPinningChange = React.useCallback<OnChangeFn<ColumnPinningState>>(
    (updater) => {
      setInternalColumnPinning(updater)
      onColumnPinningChange?.(updater)
    },
    [onColumnPinningChange],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      columnOrder,
      columnPinning: currentColumnPinning,
      pagination,
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: handleColumnPinningChange,
    onPaginationChange: setPagination,
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount: paginationProp?.total,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: rowKey
      ? (row) => String((row as Record<string, unknown>)[rowKey as string])
      : undefined,
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const nextData = reorderDataByRows(
      data,
      table.getRowModel().rows,
      String(active.id),
      String(over.id),
    )
    if (nextData === data) return

    setData(nextData)
    onDragSortEnd?.(nextData)
  }

  const rows = table.getRowModel().rows
  const rowIds = rows.map((row) => row.id)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = visibleColumns.length + (dragSort ? 1 : 0)
  const renderContext = React.useMemo<ProTableRenderContext<TData>>(
    () => ({ table, rows, selectedRows }),
    [table, rows, selectedRows],
  )
  const isFullLayout = layout === 'full'
  const headerContent = typeof header === 'function' ? header(renderContext) : header
  const bulkActions = bulkActionRender?.(renderContext)
  const content = (
    <>
      <div
        className={cn(
          'overflow-auto rounded-md border',
          tableScrollbarClassName,
          isFullLayout && 'min-h-0 flex-1',
        )}
      >
        <table data-slot="table" className="w-full min-w-max caption-bottom text-sm">
          <TableHeader>
            <ProTableHeader
              headerGroups={table.getHeaderGroups()}
              dragSort={dragSort}
              sticky={stickyHeader}
            />
          </TableHeader>
          <TableBody>
            <ProTableBody
              rows={rows}
              rowIds={rowIds}
              visibleColumns={visibleColumns}
              visibleColumnCount={visibleColumnCount}
              dragSort={dragSort}
              loading={loading}
              loadingRows={loadingRows}
              paddingClass={cellPadding[tableSize]}
              emptyIcon={emptyIcon}
              emptyText={emptyText}
            />
          </TableBody>
        </table>
      </div>
      {showPagination && (
        <div className={cn(isFullLayout && 'shrink-0')}>
          <ProTablePagination table={table} pageSizeOptions={pageSizeOptions} />
        </div>
      )}
    </>
  )

  return (
    <div
      className={cn(isFullLayout ? 'flex h-full min-h-0 flex-col gap-3' : 'space-y-3', className)}
    >
      {headerContent && <div className="shrink-0">{headerContent}</div>}
      <ProTableToolbar
        table={table}
        disabled={loading}
        filterRender={filterRender}
        toolBarRender={toolBarRender}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        showColumnToggle={showColumnToggle}
        onRefresh={onRefresh}
        tableSize={tableSize}
        onTableSizeChange={setTableSize}
        defaultColumnOrder={defaultColumnOrder}
        defaultColumnPinning={defaultColumnPinning}
      />
      {dragSort && !loading ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {content}
        </DndContext>
      ) : (
        content
      )}
      {bulkActionRender && (
        <ProTableBulkActions table={table} entityName={bulkActionEntityName}>
          {bulkActions}
        </ProTableBulkActions>
      )}
    </div>
  )
}
