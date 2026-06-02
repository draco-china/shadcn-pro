'use client'

import type { PaginationState, Table } from '@tanstack/react-table'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import type { ProTablePaginationOptions } from '../types'

interface ProTablePaginationClampOptions<TData> {
  table: Table<TData>
  pagination: PaginationState
  setPagination: Dispatch<SetStateAction<PaginationState>>
  paginationOptions?: false | ProTablePaginationOptions
}

export function useProTablePaginationClamp<TData>({
  table,
  pagination,
  setPagination,
  paginationOptions,
}: ProTablePaginationClampOptions<TData>) {
  const pageCount = table.getPageCount()

  useEffect(() => {
    if (paginationOptions === false || pageCount <= 0 || pagination.pageIndex < pageCount) return
    setPagination((current) => ({ ...current, pageIndex: pageCount - 1 }))
  }, [pageCount, pagination.pageIndex, paginationOptions, setPagination])
}
