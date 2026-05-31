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
  type FilterFn,
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

import { Button } from '@/components/ui/button'
import { TableBody, TableHeader } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ProTablePagination } from './pagination'
import { ProTableBody } from './table/body'
import { ProTableHeader } from './table/header'
import { getDefaultColumnPinning, getLeafColumnIds, reorderDataByRows } from './table/utils'
import { ProTableToolbar } from './toolbar'
import { ProTableBulkActions } from './toolbar/bulk-actions'
import {
  cellPadding,
  type ProTableColumnFilter,
  type ProTableColumnMeta,
  type ProTableSearch,
  type TableSize,
} from './types'

const tableScrollbarClassName =
  '[scrollbar-gutter:auto] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35'

export interface ProTableRenderContext<TData> {
  table: TanStackTable<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
}

export type ProTableActionContent<TData> =
  | React.ReactNode
  | ((context: ProTableRenderContext<TData>) => React.ReactNode)

export interface ProTableAction<TData>
  extends Omit<
    React.ComponentProps<typeof Button>,
    'children' | 'disabled' | 'hidden' | 'onClick'
  > {
  key: string
  label: ProTableActionContent<TData>
  icon?: ProTableActionContent<TData>
  tooltip?: ProTableActionContent<TData>
  disabled?: boolean | ((context: ProTableRenderContext<TData>) => boolean)
  hidden?: boolean | ((context: ProTableRenderContext<TData>) => boolean)
  onClick?: (context: ProTableRenderContext<TData>) => void
}

export type ProTableLayout = 'full' | 'auto'

export interface ProTableState {
  pagination: PaginationState
  sorting: SortingState
  columnFilters: ColumnFiltersState
}

export interface ProTableRequestParams extends ProTableState {}

export type ProTableRequest<TData> = (
  params: ProTableRequestParams,
) => Promise<{ data: TData[]; total?: number }> | { data: TData[]; total?: number }

export interface ProTableToolbarOptions<TData> {
  search?: ProTableSearch
  actions?: ProTableAction<TData>[]
  options?:
    | false
    | {
        refresh?: false | (() => void)
        density?: boolean
        columns?: boolean
      }
}

export interface ProTableBulkToolbarOptions<TData> {
  actions?: ProTableAction<TData>[]
  entityName?: string
}

export interface ProTablePaginationOptions {
  pageSizeOptions?: number[]
}

export interface ProTableLoadingOptions {
  rows?: number
}

export type ProTableEmptyOptions =
  | React.ReactNode
  | {
      text?: React.ReactNode
      icon?: React.ReactNode
    }

export interface ProTableDragSortOptions<TData> {
  rowKey?: Extract<keyof TData, string | number>
  onDragSortEnd?: (newData: TData[]) => void
}

export interface ProTableTableOptions {
  stickyHeader?: boolean
  pinning?:
    | false
    | {
        value?: ColumnPinningState
        onChange?: (value: ColumnPinningState) => void
      }
}

export interface ProTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  request?: ProTableRequest<TData>
  initialState?: Partial<ProTableState>
  onChange?: (state: ProTableState) => void
  header?: React.ReactNode | ((context: ProTableRenderContext<TData>) => React.ReactNode)
  toolbar?: false | ProTableToolbarOptions<TData>
  bulkToolbar?: false | ProTableBulkToolbarOptions<TData>
  pagination?: false | ProTablePaginationOptions
  dragSort?: false | ProTableDragSortOptions<TData>
  loading?: boolean | ProTableLoadingOptions
  empty?: ProTableEmptyOptions
  layout?: ProTableLayout
  table?: ProTableTableOptions
  className?: string
}

export function ProTable<TData, TValue>({
  columns,
  data: dataProp = [],
  request,
  initialState,
  onChange,
  header,
  toolbar,
  bulkToolbar,
  pagination: paginationOptions,
  dragSort,
  loading = false,
  empty,
  layout = 'full',
  table: tableOptions,
  className,
}: ProTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(dataProp)
  const [requestLoading, setRequestLoading] = React.useState(false)
  const [requestTotal, setRequestTotal] = React.useState<number>()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  )
  const [sorting, setSorting] = React.useState<SortingState>(initialState?.sorting ?? [])
  const manualPagination = Boolean(request)
  const manualSorting = Boolean(request)
  const manualFiltering = Boolean(request)
  const [pagination, setPagination] = React.useState<PaginationState>(
    initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const [tableSize, setTableSize] = React.useState<TableSize>('default')
  const dragSortOptions = dragSort === false ? undefined : dragSort
  const dragSortEnabled = Boolean(dragSortOptions)
  const dragSortRowKey = dragSortOptions?.rowKey
  const loadingEnabled = Boolean(loading)
  const loadingRows = typeof loading === 'object' ? (loading.rows ?? 5) : 5
  const emptyOptions = getEmptyOptions(empty)
  const paginationEnabled = paginationOptions !== false
  const pageSizeOptions = typeof paginationOptions === 'object' ? paginationOptions.pageSizeOptions : undefined
  const tableColumns = React.useMemo(() => withAutoFilterFns(columns), [columns])
  const defaultColumnOrder = React.useMemo(() => getLeafColumnIds(tableColumns), [tableColumns])
  const defaultColumnPinning = React.useMemo(
    () => getDefaultColumnPinning(tableColumns),
    [tableColumns],
  )
  const defaultColumnOrderKey = defaultColumnOrder.join('\0')
  const defaultColumnPinningKey = `${defaultColumnPinning.left?.join('\0') ?? ''}\u0001${defaultColumnPinning.right?.join('\0') ?? ''}`
  const [columnOrder, setColumnOrder] = React.useState<string[]>(defaultColumnOrder)
  const [internalColumnPinning, setInternalColumnPinning] =
    React.useState<ColumnPinningState>(defaultColumnPinning)
  const pinningOptions = tableOptions?.pinning === false ? undefined : tableOptions?.pinning
  const currentColumnPinning = pinningOptions?.value ?? internalColumnPinning

  React.useEffect(() => {
    if (!request) setData(dataProp)
  }, [dataProp, request])

  const tableState = React.useMemo<ProTableState>(
    () => ({ pagination, sorting, columnFilters }),
    [pagination, sorting, columnFilters],
  )

  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onChange?.(tableState)
  }, [onChange, tableState])

  React.useEffect(() => {
    if (!request) return
    let canceled = false
    setRequestLoading(true)
    Promise.resolve(request(tableState))
      .then((result) => {
        if (canceled) return
        setData(result.data)
        setRequestTotal(result.total)
      })
      .finally(() => {
        if (!canceled) setRequestLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [request, tableState])

  React.useEffect(() => {
    setColumnOrder((current) => [
      ...current.filter((id) => defaultColumnOrder.includes(id)),
      ...defaultColumnOrder.filter((id) => !current.includes(id)),
    ])
  }, [defaultColumnOrderKey])
  React.useEffect(() => {
    if (tableOptions?.pinning === false || pinningOptions?.value) return
    setInternalColumnPinning(defaultColumnPinning)
  }, [tableOptions?.pinning, pinningOptions?.value, defaultColumnPinningKey])

  const handleColumnPinningChange = React.useCallback<OnChangeFn<ColumnPinningState>>(
    (updater) => {
      setInternalColumnPinning((current) => {
        const next = typeof updater === 'function' ? updater(current) : updater
        pinningOptions?.onChange?.(next)
        return next
      })
    },
    [pinningOptions],
  )
  const resetToFirstPage = React.useCallback(() => {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }, [])
  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      setSorting(updater)
      resetToFirstPage()
    },
    [resetToFirstPage],
  )
  const handleColumnFiltersChange = React.useCallback<OnChangeFn<ColumnFiltersState>>(
    (updater) => {
      setColumnFilters(updater)
      resetToFirstPage()
    },
    [resetToFirstPage],
  )
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder,
      columnPinning: currentColumnPinning,
      pagination,
    },
    enableRowSelection: true,
    enableColumnPinning: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: handleColumnPinningChange,
    onPaginationChange: setPagination,
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount: request ? requestTotal : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: dragSortRowKey !== undefined ? (row) => String(row[dragSortRowKey]) : undefined,
  })

  const pageCount = table.getPageCount()
  React.useEffect(() => {
    if (!paginationEnabled || pageCount <= 0 || pagination.pageIndex < pageCount) return
    setPagination((current) => ({ ...current, pageIndex: pageCount - 1 }))
  }, [pageCount, pagination.pageIndex, paginationEnabled])

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
    dragSortOptions?.onDragSortEnd?.(nextData)
  }

  const rows = table.getRowModel().rows
  const rowIds = rows.map((row) => row.id)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = visibleColumns.length + (dragSortEnabled ? 1 : 0)
  const renderContext = React.useMemo<ProTableRenderContext<TData>>(
    () => ({ table, rows, selectedRows }),
    [table, rows, selectedRows],
  )
  const isFullLayout = layout === 'full'
  const headerContent = typeof header === 'function' ? header(renderContext) : header
  const toolbarOptions = toolbar === false ? undefined : toolbar
  const toolbarBuiltInOptions =
    toolbarOptions?.options === false ? undefined : toolbarOptions?.options
  const bulkToolbarOptions = bulkToolbar === false ? undefined : bulkToolbar
  const toolbarActionNodes = renderActions(toolbarOptions?.actions, renderContext)
  const bulkActionNodes = renderActions(bulkToolbarOptions?.actions, renderContext)
  const hasBulkActions = bulkActionNodes.length > 0
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
              dragSort={dragSortEnabled}
              sticky={tableOptions?.stickyHeader ?? true}
            />
          </TableHeader>
          <TableBody>
            <ProTableBody
              rows={rows}
              rowIds={rowIds}
              visibleColumns={visibleColumns}
              visibleColumnCount={visibleColumnCount}
              dragSort={dragSortEnabled}
              loading={loadingEnabled || requestLoading}
              loadingRows={loadingRows}
              paddingClass={cellPadding[tableSize]}
              emptyIcon={emptyOptions.icon}
              emptyText={emptyOptions.text}
            />
          </TableBody>
        </table>
      </div>
      {paginationEnabled && (
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
      {toolbar !== false && (
        <ProTableToolbar
          table={table}
          disabled={loadingEnabled || requestLoading}
          search={toolbarOptions?.search}
          actions={toolbarActionNodes}
          columns={toolbarBuiltInOptions?.columns ?? true}
          density={toolbarBuiltInOptions?.density ?? true}
          refresh={toolbarBuiltInOptions?.refresh || undefined}
          tableSize={tableSize}
          onTableSizeChange={setTableSize}
          defaultColumnOrder={defaultColumnOrder}
          defaultColumnPinning={defaultColumnPinning}
        />
      )}
      {dragSortEnabled && !loading && !requestLoading ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {content}
        </DndContext>
      ) : (
        content
      )}
      {hasBulkActions && (
        <ProTableBulkActions table={table} entityName={bulkToolbarOptions?.entityName}>
          {bulkActionNodes}
        </ProTableBulkActions>
      )}
    </div>
  )
}

function withAutoFilterFns<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): ColumnDef<TData, TValue>[] {
  return columns.map((column) => {
    const columnDef = column as ColumnDef<TData, TValue> & {
      columns?: ColumnDef<TData, TValue>[]
      filterFn?: unknown
      meta?: ProTableColumnMeta
    }
    const children = columnDef.columns ? withAutoFilterFns(columnDef.columns) : undefined
    const filter = columnDef.meta?.filter
    const shouldApplyFilter = filter && columnDef.filterFn === undefined

    if (!children && !shouldApplyFilter) return column

    return {
      ...column,
      ...(children ? { columns: children } : {}),
      ...(shouldApplyFilter
        ? {
            filterFn: filter.onFilter
              ? createFilterFn(filter.onFilter)
              : getDefaultFilterFn<TData>(filter.mode),
          }
        : {}),
    }
  })
}

function getEmptyOptions(empty: ProTableEmptyOptions | undefined) {
  if (
    empty &&
    typeof empty === 'object' &&
    !React.isValidElement(empty) &&
    !Array.isArray(empty) &&
    ('text' in empty || 'icon' in empty)
  ) {
    return empty
  }

  return { text: empty }
}

function getDefaultFilterFn<TData>(mode: ProTableColumnFilter['mode']) {
  return mode === 'single' ? 'equals' : (multiValueFilter as FilterFn<TData>)
}

function createFilterFn<TData>(
  onFilter: NonNullable<ProTableColumnFilter['onFilter']>,
): FilterFn<TData> {
  return (row, _columnId, filterValue) => {
    const values = Array.isArray(filterValue)
      ? filterValue
      : filterValue === undefined || filterValue === null || filterValue === ''
        ? []
        : [filterValue]

    return values.length === 0 || values.some((value) => onFilter(String(value), row.original))
  }
}

function multiValueFilter<TData>(row: Row<TData>, columnId: string, filterValue: unknown) {
  const values = Array.isArray(filterValue)
    ? filterValue
    : filterValue === undefined || filterValue === null || filterValue === ''
      ? []
      : [filterValue]

  return values.length === 0 || values.includes(row.getValue(columnId))
}

function renderActions<TData>(
  actions: ProTableAction<TData>[] | undefined,
  context: ProTableRenderContext<TData>,
) {
  return (actions ?? [])
    .filter((action) => !resolveActionState(action.hidden, context))
    .map((action) => {
      const { key, label, icon, tooltip, disabled, hidden, onClick, ...buttonProps } = action
      void hidden

      const tooltipContent = resolveActionContent(tooltip, context)
      const button = (
        <Button
          key={key}
          type="button"
          variant="outline"
          size="sm"
          {...buttonProps}
          disabled={resolveActionState(disabled, context)}
          onClick={() => onClick?.(context)}
        >
          {resolveActionContent(icon, context)}
          {resolveActionContent(label, context)}
        </Button>
      )

      if (!tooltipContent) return button

      return (
        <Tooltip key={key}>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      )
    })
}

function resolveActionState<TData>(
  value: boolean | ((context: ProTableRenderContext<TData>) => boolean) | undefined,
  context: ProTableRenderContext<TData>,
) {
  return typeof value === 'function' ? value(context) : Boolean(value)
}

function resolveActionContent<TData>(
  value: ProTableActionContent<TData> | undefined,
  context: ProTableRenderContext<TData>,
) {
  return typeof value === 'function' ? value(context) : value
}
