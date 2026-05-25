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
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
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
  '[scrollbar-gutter:auto] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35'

export interface ProTableRenderContext<TData> {
  table: TanStackTable<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
}

export type ProTableLayout = 'full' | 'auto'

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
}: ProTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
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
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder,
      columnPinning: currentColumnPinning,
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: handleColumnPinningChange,
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
