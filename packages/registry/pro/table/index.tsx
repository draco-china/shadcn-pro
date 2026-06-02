'use client'

import { DataTable } from './table/data-table'
import { RequestTable } from './table/request-table'
import { ProTableView } from './table/view'
import type { ProTableProps } from './types'

export type {
  ProTableAction,
  ProTableBulkToolbarOptions,
  ProTableDragSortOptions,
  ProTableEmptyOptions,
  ProTableLayout,
  ProTableLoadingOptions,
  ProTablePaginationOptions,
  ProTableProps,
  ProTableRenderContext,
  ProTableRequest,
  ProTableRequestParams,
  ProTableState,
  ProTableTableOptions,
  ProTableToolbarOptions,
} from './types'

export function ProTable<TData, TValue>(props: ProTableProps<TData, TValue>) {
  const {
    columns,
    data,
    request,
    initialState,
    onChange,
    header,
    toolbar,
    bulkToolbar,
    pagination,
    dragSort,
    loading,
    empty,
    layout,
    table,
    className,
  } = props

  if (request) {
    return (
      <RequestTable data={data} request={request} initialState={initialState} onChange={onChange}>
        {(controller) => (
          <ProTableView
            columns={columns}
            header={header}
            toolbar={toolbar}
            bulkToolbar={bulkToolbar}
            dragSort={dragSort}
            loading={loading}
            empty={empty}
            layout={layout}
            table={table}
            className={className}
            pagination={controller.pagination}
            setPagination={controller.setPagination}
            sorting={controller.sorting}
            setSorting={controller.setSorting}
            columnFilters={controller.columnFilters}
            setColumnFilters={controller.setColumnFilters}
            data={controller.data}
            setData={controller.setData}
            requestLoading={controller.requestLoading}
            requestError={controller.requestError}
            requestTotal={controller.requestTotal}
            paginationOptions={pagination}
            manual
          />
        )}
      </RequestTable>
    )
  }

  return (
    <DataTable data={data} initialState={initialState} onChange={onChange}>
      {(controller) => (
        <ProTableView
          columns={columns}
          header={header}
          toolbar={toolbar}
          bulkToolbar={bulkToolbar}
          dragSort={dragSort}
          loading={loading}
          empty={empty}
          layout={layout}
          table={table}
          className={className}
          pagination={controller.pagination}
          setPagination={controller.setPagination}
          sorting={controller.sorting}
          setSorting={controller.setSorting}
          columnFilters={controller.columnFilters}
          setColumnFilters={controller.setColumnFilters}
          data={controller.data}
          setData={controller.setData}
          paginationOptions={pagination}
        />
      )}
    </DataTable>
  )
}
