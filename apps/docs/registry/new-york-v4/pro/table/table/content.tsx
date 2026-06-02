import { cn } from '@/lib/utils'
import type { useProTable } from '../hooks/use-table'
import { ProTablePagination } from '../pagination'
import type {
  ProTableEmptyOptions,
  ProTablePaginationOptions,
  ProTableTableOptions,
} from '../types'
import { cellPadding } from '../types'
import { ProTableBody } from './body'
import {
  tableContentElementClassName,
  tableContentFrameClassName,
  tableFullLayoutSpacerClassName,
  tablePaginationFullLayoutClassName,
  tableScrollbarClassName,
} from './classes'
import { ProTableBodyElement, ProTableElement, ProTableHeaderElement } from './elements'
import { ProTableHeader } from './header'

export interface ProTableContentProps<TData> {
  proTable: ReturnType<typeof useProTable<TData, unknown>>
  tableOptions?: ProTableTableOptions
  paginationOptions?: false | ProTablePaginationOptions
  fullLayout: boolean
  loading: boolean
  loadingRows: number
  empty?: ProTableEmptyOptions
  requestError?: unknown
}

export function ProTableContent<TData>({
  proTable,
  tableOptions,
  paginationOptions,
  fullLayout,
  loading,
  loadingRows,
  empty,
  requestError,
}: ProTableContentProps<TData>) {
  const pagination =
    typeof paginationOptions === 'object' && paginationOptions ? paginationOptions : undefined

  return (
    <>
      <div className={cn(tableContentFrameClassName, tableScrollbarClassName)}>
        <ProTableElement ref={proTable.tableRef} className={tableContentElementClassName}>
          <ProTableHeaderElement>
            <ProTableHeader
              headerGroups={proTable.table.getHeaderGroups()}
              dragSort={proTable.dragSortEnabled}
              sticky={tableOptions?.stickyHeader ?? true}
              pinnedOffsets={proTable.pinnedOffsets}
            />
          </ProTableHeaderElement>
          <ProTableBodyElement>
            <ProTableBody
              rows={proTable.rows}
              rowIds={proTable.rowIds}
              visibleColumns={proTable.visibleColumns}
              visibleColumnCount={proTable.visibleColumnCount}
              dragSort={proTable.dragSortEnabled}
              fillEmpty={false}
              loading={loading}
              loadingRows={loadingRows}
              paddingClass={cellPadding[proTable.tableSize]}
              empty={empty}
              emptyFallbackText={requestError ? 'Failed to load data' : undefined}
              pinnedOffsets={proTable.pinnedOffsets}
            />
          </ProTableBodyElement>
        </ProTableElement>
      </div>
      {fullLayout && <div className={tableFullLayoutSpacerClassName} aria-hidden="true" />}
      {paginationOptions !== false && (
        <div className={fullLayout ? tablePaginationFullLayoutClassName : undefined}>
          <ProTablePagination
            table={proTable.table}
            pageSizeOptions={pagination?.pageSizeOptions}
            showTotal={pagination?.showTotal}
            showQuickJump={pagination?.showQuickJump}
            labels={pagination?.labels}
          />
        </div>
      )}
    </>
  )
}
