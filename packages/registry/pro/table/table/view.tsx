import type { Dispatch, SetStateAction } from 'react'
import { cn } from '@/lib/utils'
import { useProTable } from '../hooks/use-table'
import type { ProTablePaginationOptions, ProTableProps } from '../types'
import {
  tableViewAutoLayoutClassName,
  tableViewFullLayoutClassName,
  tableViewRootClassName,
} from './classes'
import { ProTableContentFrame } from './content-frame'
import type { ProTableStateController } from './state'
import { ProTableViewBulkActions } from './view-bulk-actions'
import { ProTableViewHeader } from './view-header'
import { ProTableViewToolbar } from './view-toolbar'

export interface ProTableViewProps<TData, TValue>
  extends Omit<
      ProTableProps<TData, TValue>,
      'data' | 'request' | 'initialState' | 'onChange' | 'pagination'
    >,
    Omit<ProTableStateController, 'state'> {
  data: TData[]
  setData: Dispatch<SetStateAction<TData[]>>
  paginationOptions?: false | ProTablePaginationOptions
  manual?: boolean
  requestLoading?: boolean
  requestError?: unknown
  requestTotal?: number
}

export function ProTableView<TData, TValue>({
  header,
  toolbar,
  bulkToolbar,
  paginationOptions,
  empty,
  loading = false,
  layout = 'full',
  table: tableOptions,
  className,
  requestLoading = false,
  requestError,
  columns,
  data,
  setData,
  manual = false,
  requestTotal,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
}: ProTableViewProps<TData, TValue>) {
  const loadingRows = typeof loading === 'object' ? (loading.rows ?? 5) : 5
  const loadingEnabled = loading !== false || requestLoading
  const proTable = useProTable({
    columns,
    data,
    setData,
    toolbar,
    paginationOptions,
    tableOptions,
    manual,
    requestTotal,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  })
  const isFullLayout = layout === 'full'

  return (
    <div
      className={cn(
        tableViewRootClassName,
        isFullLayout ? tableViewFullLayoutClassName : tableViewAutoLayoutClassName,
        className,
      )}
    >
      <ProTableViewHeader header={header} context={proTable.renderContext} />
      <ProTableViewToolbar proTable={proTable} toolbar={toolbar} disabled={loadingEnabled} />
      <ProTableContentFrame
        proTable={proTable}
        tableOptions={tableOptions}
        paginationOptions={paginationOptions}
        fullLayout={isFullLayout}
        loading={loadingEnabled}
        loadingRows={loadingRows}
        empty={empty}
        requestError={requestError}
      />
      <ProTableViewBulkActions proTable={proTable} bulkToolbar={bulkToolbar} />
    </div>
  )
}
