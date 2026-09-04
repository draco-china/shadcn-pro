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
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { RankingInfo } from '@tanstack/match-sorter-utils'
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table,
  type TableOptions,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import {
  type CSSProperties,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import type { ProButtonSize } from '../base/button'
import { ProPagination } from '../pagination'
import { getPinnedColumnClassName, getPinnedColumnStyle, ProTableBody } from './body'
import { ProTableBulkActions } from './bulk-actions'
import { ProTableSearchBar } from './search-bar'
import {
  type ColumnFilterMeta,
  type ProTableTableOptions,
  sortRowsByRank,
  useProTableColumnState,
  useProTablePinnedColumnOffsets,
  withProTableColumnDefaults,
} from './table-state'
import { ProTableToolbarActions, type TableSize } from './toolbar-actions'
import {
  type ProTableStateValue,
  type UrlColumnFilterConfig,
  useProTableUrlStateValue,
} from './url-state'

/** Pagination, sorting, and filter state managed by ProTable. */
export interface ProTableState extends ProTableStateValue {}

/** Maps a table column filter to a URL search parameter. */
export type ColumnFilterConfig = UrlColumnFilterConfig

/** Synchronizes ProTable state with a router's search parameters. */
export const useProTableUrlState = useProTableUrlStateValue

interface ProTableDragSortOptions<TData> {
  rowKey: Extract<keyof TData, string | number>
  onDragSortEnd?: (newData: TData[]) => void
}

export type ProTableRowKey<TData> =
  | Extract<keyof TData, string | number>
  | ((record: TData) => string | number)

interface ProTableRenderContext<TData> {
  table: Table<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
  tableSize: TableSize
  size?: ProButtonSize
}

type ProTableToolbarSlot<TData> = ReactNode | ((context: ProTableRenderContext<TData>) => ReactNode)

/** Search, actions, and table controls rendered around the table header. */
export interface ProTableToolbarOptions<TData> {
  actions?: ProTableToolbarSlot<TData>
  searchPlacement?: 'header' | 'below'
  density?: boolean
  columns?: boolean
  onRefresh?: () => void
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    pinned?: 'left' | 'right'
    align?: 'left' | 'center' | 'right'
    className?: string
    search?:
      | boolean
      | {
          placeholder?: string
        }
    filter?: ColumnFilterMeta<TData>
    __proTableFixedSize?: number
  }
  interface FilterMeta {
    itemRank?: RankingInfo
  }
}

function useProTable<TData, TValue>({
  columns,
  data,
  setData,
  rowKey,
  size,
  paginationOptions,
  dragSort,
  tableOptions,
  manual = false,
  requestTotal,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setData: Dispatch<SetStateAction<TData[]>>
  rowKey?: ProTableRowKey<TData>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnFilters: ColumnFiltersState
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
  size?: ProButtonSize
  paginationOptions?: false
  dragSort?: false | ProTableDragSortOptions<TData>
  tableOptions?: ProTableTableOptions
  manual?: boolean
  requestTotal?: number
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [tableSize, setTableSize] = useState<TableSize>('default')
  const tableRef = useRef<HTMLTableElement>(null)
  const tableColumns = useMemo(() => withProTableColumnDefaults(columns), [columns])
  const rankedSortedRowModel = useMemo(() => {
    const sortedRowModel = getSortedRowModel<TData>()

    return (table: Table<TData>) => {
      const getSorted = sortedRowModel(table)

      return () => {
        const rowModel = getSorted()
        if (table.options.manualSorting || table.getState().sorting.length > 0) return rowModel

        const rankedColumnId = rowModel.rows
          .flatMap((row) =>
            Object.keys(row.columnFiltersMeta).filter(
              (columnId) => !!row.columnFiltersMeta[columnId]?.itemRank,
            ),
          )
          .at(0)
        if (!rankedColumnId) return rowModel

        return {
          ...rowModel,
          rows: sortRowsByRank(rowModel.rows, rankedColumnId),
          flatRows: sortRowsByRank(rowModel.flatRows, rankedColumnId),
        }
      }
    }
  }, [])
  const columnState = useProTableColumnState(tableColumns, tableOptions)
  const resetToFirstPage = useCallback(() => {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
  }, [setPagination])
  const handleSortingChange = useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      setSorting(updater)
      resetToFirstPage()
    },
    [resetToFirstPage, setSorting],
  )
  const handleColumnFiltersChange = useCallback<OnChangeFn<ColumnFiltersState>>(
    (updater) => {
      setColumnFilters(updater)
      resetToFirstPage()
    },
    [resetToFirstPage, setColumnFilters],
  )
  const reactTableOptions: TableOptions<TData> = {
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder: columnState.columnOrder,
      columnPinning: columnState.columnPinning,
      pagination,
    },
    enableRowSelection: true,
    enableColumnPinning: columnState.pinningEnabled,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: columnState.setColumnOrder,
    onColumnPinningChange: columnState.handleColumnPinningChange,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: rankedSortedRowModel,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  }
  if (manual) {
    reactTableOptions.manualPagination = true
    reactTableOptions.manualSorting = true
    reactTableOptions.manualFiltering = true
    reactTableOptions.rowCount = requestTotal
  }
  const resolvedRowKey = rowKey ?? dragSort?.rowKey
  if (resolvedRowKey !== undefined) {
    reactTableOptions.getRowId = (row) =>
      String(typeof resolvedRowKey === 'function' ? resolvedRowKey(row) : row[resolvedRowKey])
  }
  const table = useReactTable(reactTableOptions)
  const pageCount = table.getPageCount()

  useEffect(() => {
    if (paginationOptions === false || pageCount <= 0 || pagination.pageIndex < pageCount) return
    setPagination((current) => ({ ...current, pageIndex: pageCount - 1 }))
  }, [pageCount, pagination.pageIndex, paginationOptions, setPagination])

  const dragSortEnabled = !!dragSort
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const rows = table.getRowModel().rows
      const oldIndex = rows.findIndex((row) => row.id === String(active.id))
      const newIndex = rows.findIndex((row) => row.id === String(over.id))
      if (oldIndex === -1 || newIndex === -1) return

      const oldDataIndex = data.indexOf(rows[oldIndex].original)
      const newDataIndex = data.indexOf(rows[newIndex].original)
      if (oldDataIndex === -1 || newDataIndex === -1) return

      const nextData = arrayMove(data, oldDataIndex, newDataIndex)
      if (nextData === data) return

      setData(nextData)
      if (dragSort) dragSort.onDragSortEnd?.(nextData)
    },
    [data, dragSort, setData, table],
  )
  const pinnedOffsets = useProTablePinnedColumnOffsets(table, tableRef, dragSortEnabled)
  const rows = table.getRowModel().rows
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const visibleColumns = table.getVisibleLeafColumns()
  const visibleColumnCount = visibleColumns.length + (dragSortEnabled ? 1 : 0)
  const renderContext: ProTableRenderContext<TData> = {
    table,
    rows,
    selectedRows,
    tableSize,
    size,
  }

  return {
    table,
    tableRef,
    tableSize,
    setTableSize,
    rows,
    selectedRows,
    visibleColumns,
    visibleColumnCount,
    renderContext,
    pinnedOffsets,
    sensors,
    handleDragEnd,
    dragSortEnabled,
    defaultColumnOrder: columnState.defaultColumnOrder,
    defaultColumnPinning: columnState.defaultColumnPinning,
  }
}

function renderToolbarSlot<TData>(
  toolbar: ProTableToolbarSlot<TData> | undefined,
  context: ProTableRenderContext<TData>,
) {
  if (toolbar === false) return undefined
  if (typeof toolbar === 'function') return toolbar(context)
  return toolbar
}

function getTablePaddingClass(size: TableSize) {
  if (size === 'compact') return 'py-1'
  if (size === 'middle') return 'py-2'
  return 'py-3'
}

function getAriaSort(canSort: boolean, sorted: false | 'asc' | 'desc') {
  if (!canSort) return undefined
  if (sorted === 'asc') return 'ascending'
  if (sorted === 'desc') return 'descending'
  return 'none'
}

function renderSortIcon(sorted: false | 'asc' | 'desc') {
  if (sorted === 'asc') return <ArrowUp size={14} />
  if (sorted === 'desc') return <ArrowDown size={14} />
  return <ArrowUpDown size={14} className="opacity-40" />
}

export interface ProTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  rowKey?: ProTableRowKey<TData>
  request?: (
    params: ProTableState,
  ) => Promise<{ data: TData[]; total?: number }> | { data: TData[]; total?: number }
  initialState?: Partial<ProTableState>
  onChange?: (state: ProTableState) => void
  header?: ReactNode | ((context: ProTableRenderContext<TData>) => ReactNode)
  toolbar?: false | ProTableToolbarOptions<TData>
  size?: ProButtonSize
  bulkToolbar?: false | ProTableToolbarSlot<TData>
  pagination?: false
  dragSort?: false | ProTableDragSortOptions<TData>
  loading?: boolean | { rows?: number }
  layout?: 'full' | 'auto'
  table?: ProTableTableOptions
  className?: string
}

/** Feature-rich local or remote TanStack data table. */
export function ProTable<TData, TValue>({
  columns,
  data,
  rowKey,
  request,
  initialState,
  onChange,
  header,
  toolbar,
  size,
  bulkToolbar,
  pagination,
  dragSort,
  loading,
  layout,
  table,
  className,
}: ProTableProps<TData, TValue>) {
  const dragContextId = useId()
  const toolbarButtonSize = size ?? 'icon'
  const [tableData, setTableData] = useState<TData[]>(data ?? [])
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState<unknown>()
  const [requestTotal, setRequestTotal] = useState<number>()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState?.columnFilters ?? [],
  )
  const [sorting, setSorting] = useState<SortingState>(initialState?.sorting ?? [])
  const [paginationState, setPagination] = useState<PaginationState>(
    initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
  )

  useEffect(() => {
    const nextPagination = initialState?.pagination
    const nextSorting = initialState?.sorting
    const nextColumnFilters = initialState?.columnFilters

    if (nextPagination) {
      setPagination((current) =>
        current.pageIndex === nextPagination.pageIndex &&
        current.pageSize === nextPagination.pageSize
          ? current
          : nextPagination,
      )
    }
    if (nextSorting) {
      setSorting((current) =>
        JSON.stringify(current) === JSON.stringify(nextSorting) ? current : nextSorting,
      )
    }
    if (nextColumnFilters) {
      setColumnFilters((current) =>
        JSON.stringify(current) === JSON.stringify(nextColumnFilters) ? current : nextColumnFilters,
      )
    }
  }, [initialState?.columnFilters, initialState?.pagination, initialState?.sorting])
  const state = useMemo<ProTableState>(
    () => ({ pagination: paginationState, sorting, columnFilters }),
    [paginationState, sorting, columnFilters],
  )
  const mountedRef = useRef(false)

  useEffect(() => {
    if (request) return
    setTableData(data ?? [])
  }, [data, request])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onChange?.(state)
  }, [onChange, state])

  useEffect(() => {
    if (!request) return

    let canceled = false
    setRequestLoading(true)
    setRequestError(undefined)

    Promise.resolve(request(state))
      .then((result) => {
        if (canceled) return
        setTableData(result.data)
        setRequestTotal(result.total)
      })
      .catch((error) => {
        if (canceled) return
        setRequestError(error)
        setTableData([])
        setRequestTotal(undefined)
      })
      .finally(() => {
        if (!canceled) setRequestLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [request, state])

  const toolbarOptions = toolbar === false ? undefined : toolbar
  const searchPlacement = toolbarOptions?.searchPlacement ?? 'below'
  const loadingRows = typeof loading === 'object' ? (loading.rows ?? 5) : 5
  const loadingEnabled = (loading !== undefined && loading !== false) || requestLoading
  const proTable = useProTable({
    columns,
    data: tableData,
    setData: setTableData,
    rowKey,
    size: toolbarButtonSize,
    paginationOptions: pagination,
    dragSort,
    tableOptions: table,
    manual: !!request,
    requestTotal,
    pagination: paginationState,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  })
  const isFullLayout = (layout ?? 'full') === 'full'
  const headerContent = typeof header === 'function' ? header(proTable.renderContext) : header
  const toolbarActions = renderToolbarSlot(toolbarOptions?.actions, proTable.renderContext)
  const bulkActions = renderToolbarSlot(bulkToolbar, proTable.renderContext)
  const tableState = proTable.table.getState()
  const stickyHeader = table?.stickyHeader ?? true
  const paddingClass = getTablePaddingClass(proTable.tableSize)
  const fixedColumnsWidth = proTable.visibleColumns.reduce(
    (total, column) => total + (column.columnDef.meta?.__proTableFixedSize ?? 0),
    proTable.dragSortEnabled ? proTable.pinnedOffsets.dragWidth : 0,
  )
  const minimumTableWidth = proTable.visibleColumns.reduce(
    (total, column) => total + (column.columnDef.meta?.__proTableFixedSize ?? column.getSize()),
    proTable.dragSortEnabled ? proTable.pinnedOffsets.dragWidth : 0,
  )
  const flexibleColumnCount = proTable.visibleColumns.filter(
    (column) => column.columnDef.meta?.__proTableFixedSize === undefined,
  ).length
  const flexibleColumnWidth =
    flexibleColumnCount > 0
      ? `calc((100% - ${fixedColumnsWidth}px) / ${flexibleColumnCount})`
      : undefined
  const tableStyle = {
    '--pro-table-flex-column-width': flexibleColumnWidth,
    width: flexibleColumnCount > 0 ? '100%' : fixedColumnsWidth,
    minWidth: minimumTableWidth,
  } as CSSProperties
  const content = (
    <>
      <div
        className={cn(
          'w-full max-w-full overflow-auto rounded-md border',
          '[scrollbar-gutter:auto] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--muted-foreground)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35',
        )}
      >
        <table
          ref={proTable.tableRef}
          data-slot="pro-table"
          className="w-full table-fixed border-separate border-spacing-0 caption-bottom text-sm [&_td]:border-b [&_td]:border-border [&_td]:transition-[border-color] [&_td]:duration-150 [&_th]:border-b [&_th]:border-border [&_tbody_tr:hover>td]:border-transparent [&_tbody_tr[data-state=selected]>td]:border-transparent"
          style={tableStyle}
        >
          <colgroup>
            {proTable.dragSortEnabled && (
              <col style={{ width: proTable.pinnedOffsets.dragWidth }} />
            )}
            {proTable.visibleColumns.map((column) => (
              <col
                key={column.id}
                style={
                  column.columnDef.meta?.__proTableFixedSize === undefined
                    ? { width: flexibleColumnWidth }
                    : { width: column.columnDef.meta.__proTableFixedSize }
                }
              />
            ))}
          </colgroup>
          <thead data-slot="pro-table-header">
            {proTable.table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} data-slot="pro-table-row" className="bg-background">
                {proTable.dragSortEnabled && (
                  <th
                    data-slot="pro-table-head-cell"
                    data-pro-table-drag-column=""
                    scope="col"
                    className={cn(
                      'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                      'sticky left-0 z-20 w-8 bg-background pr-0',
                      stickyHeader && 'top-0 z-30',
                    )}
                  >
                    <span className="sr-only">Reorder rows</span>
                  </th>
                )}
                {headerGroup.headers.map((header) => {
                  const canSort = !proTable.dragSortEnabled && header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  const sortHandler = canSort ? header.column.getToggleSortingHandler() : undefined
                  const pinned = header.column.getIsPinned()
                  const align =
                    header.column.columnDef.meta?.align ??
                    (pinned === 'right' ? 'right' : pinned || undefined)
                  const ariaSort = getAriaSort(canSort, sorted)
                  const headerContent = header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && (
                        <span className="text-muted-foreground" aria-hidden="true">
                          {renderSortIcon(sorted)}
                        </span>
                      )}
                    </div>
                  )

                  return (
                    <th
                      key={header.id}
                      data-slot="pro-table-head-cell"
                      scope={header.subHeaders.length > 0 ? 'colgroup' : 'col'}
                      colSpan={header.colSpan}
                      className={cn(
                        'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&_[role=checkbox]]:border-border [&_[role=checkbox]]:shadow-none [&>[role=checkbox]]:translate-y-[2px] dark:[&_[role=checkbox][data-state=unchecked]]:bg-transparent',
                        stickyHeader && 'sticky top-0 z-10 bg-inherit',
                        pinned && 'bg-background',
                        getPinnedColumnClassName(
                          header.column,
                          header.column.getIsPinned() && stickyHeader ? 'z-30' : undefined,
                        ),
                        align === 'center' && 'text-center [&>div]:justify-center',
                        align === 'right' && 'text-right [&>div]:justify-end',
                        align === 'left' && 'text-left [&>div]:justify-start',
                        header.column.columnDef.meta?.className,
                        canSort && 'cursor-pointer select-none',
                      )}
                      style={getPinnedColumnStyle(header.column, proTable.pinnedOffsets)}
                      data-pro-table-column-id={header.column.id}
                      aria-sort={ariaSort}
                      tabIndex={canSort ? 0 : undefined}
                      onClick={sortHandler}
                      onKeyDown={
                        canSort
                          ? (event) => {
                              if (event.key !== 'Enter' && event.key !== ' ') return
                              event.preventDefault()
                              sortHandler?.(event)
                            }
                          : undefined
                      }
                    >
                      {headerContent}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody data-slot="pro-table-body" className="[&_tr:last-child>td]:border-b-0">
            <ProTableBody
              rows={proTable.rows}
              visibleColumns={proTable.visibleColumns}
              visibleColumnCount={proTable.visibleColumnCount}
              dragSort={proTable.dragSortEnabled}
              loading={loadingEnabled}
              loadingRows={loadingRows}
              paddingClass={paddingClass}
              emptyFallbackText={requestError ? 'Failed to load data' : undefined}
              pinnedOffsets={proTable.pinnedOffsets}
            />
          </tbody>
        </table>
      </div>
      {isFullLayout && <div className="min-h-0 flex-1" aria-hidden="true" />}
      {pagination !== false && (
        <div className={isFullLayout ? 'shrink-0' : undefined}>
          <ProPagination
            current={tableState.pagination.pageIndex + 1}
            pageCount={proTable.table.getPageCount()}
            pageSize={tableState.pagination.pageSize}
            total={proTable.table.getRowCount()}
            onPageChange={(page) => proTable.table.setPageIndex(page - 1)}
            onPageSizeChange={(pageSize) => {
              proTable.table.setPageSize(pageSize)
              proTable.table.setPageIndex(0)
            }}
          />
        </div>
      )}
    </>
  )
  return (
    <div
      className={cn(
        'max-w-full',
        isFullLayout ? 'flex h-full min-h-0 flex-col gap-3' : 'space-y-3',
        className,
      )}
    >
      {(headerContent != null || toolbar !== false) && (
        <div className="flex shrink-0 flex-col gap-2 md:flex-row md:items-start md:justify-between">
          {headerContent != null && <div className="min-w-0 shrink-0">{headerContent}</div>}
          {toolbar !== false && searchPlacement === 'header' && (
            <div className="min-w-0 flex-1">
              <ProTableSearchBar table={proTable.table} disabled={loadingEnabled} size={size} />
            </div>
          )}
          {toolbar !== false && (
            <ProTableToolbarActions
              table={proTable.table}
              disabled={loadingEnabled}
              actions={toolbarActions}
              size={size}
              columns={toolbarOptions?.columns ?? true}
              density={toolbarOptions?.density ?? true}
              refresh={toolbarOptions?.onRefresh}
              tableSize={proTable.tableSize}
              onTableSizeChange={proTable.setTableSize}
              defaultColumnOrder={proTable.defaultColumnOrder}
              defaultColumnPinning={proTable.defaultColumnPinning}
            />
          )}
        </div>
      )}
      {toolbar !== false && searchPlacement === 'below' && (
        <ProTableSearchBar table={proTable.table} disabled={loadingEnabled} size={size} />
      )}
      {proTable.dragSortEnabled && !loadingEnabled ? (
        <DndContext
          id={dragContextId}
          sensors={proTable.sensors}
          collisionDetection={closestCenter}
          onDragEnd={proTable.handleDragEnd}
        >
          {content}
        </DndContext>
      ) : (
        content
      )}
      {bulkActions != null && (
        <ProTableBulkActions table={proTable.table}>
          <div className="flex flex-wrap items-center justify-end gap-2">{bulkActions}</div>
        </ProTableBulkActions>
      )}
    </div>
  )
}
