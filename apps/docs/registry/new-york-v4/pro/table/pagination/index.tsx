'use client'

import type { Table } from '@tanstack/react-table'
import { useState } from 'react'
import {
  paginationControlsClassName,
  paginationDesktopTotalClassName,
  paginationRootClassName,
} from './classes'
import { PaginationNavigation } from './navigation'
import { PaginationPageSize } from './page-size'
import { PaginationQuickJump } from './quick-jump'
import { PaginationMobileTotal, PaginationTotal } from './total'
import type { ProTablePaginationLabels } from './types'
import { getPageRange } from './utils'

interface ProTablePaginationProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
  labels?: ProTablePaginationLabels
  showTotal?: boolean
  showQuickJump?: boolean
}

export type { ProTablePaginationLabels } from './types'

export function ProTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 50, 100],
  labels,
  showTotal = true,
  showQuickJump = false,
}: ProTablePaginationProps<TData>) {
  const [jumpValue, setJumpValue] = useState('')
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const safePageCount = Math.max(pageCount, 1)
  const current = Math.min(pageIndex + 1, safePageCount)
  const total = table.getRowCount()
  const selected = table.getFilteredSelectedRowModel().rows.length
  const pageSize = table.getState().pagination.pageSize

  return (
    <div className={paginationRootClassName}>
      <div className={paginationDesktopTotalClassName}>
        {showTotal && <PaginationTotal total={total} selected={selected} labels={labels} />}
      </div>

      <div className={paginationControlsClassName}>
        {showTotal && <PaginationMobileTotal total={total} selected={selected} labels={labels} />}

        <PaginationPageSize
          value={pageSize}
          options={pageSizeOptions}
          labels={labels}
          onChange={(nextPageSize) => {
            table.setPageSize(nextPageSize)
            table.setPageIndex(0)
          }}
        />

        <PaginationNavigation
          current={current}
          pageCount={safePageCount}
          pageRange={getPageRange(current, safePageCount)}
          canPrevious={table.getCanPreviousPage()}
          canNext={table.getCanNextPage()}
          labels={labels}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          onPrevious={() => table.previousPage()}
          onNext={() => table.nextPage()}
        />

        {showQuickJump && (
          <PaginationQuickJump
            value={jumpValue}
            max={safePageCount}
            labels={labels}
            onChange={setJumpValue}
            onJump={(page) => table.setPageIndex(page - 1)}
          />
        )}
      </div>
    </div>
  )
}
