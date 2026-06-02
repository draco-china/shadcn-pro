import type { ProTableState } from '../../types'

export type SearchRecord = Record<string, unknown>

export type NavigateFn = (opts: {
  search: true | SearchRecord | ((prev: SearchRecord) => Partial<SearchRecord> | SearchRecord)
  replace?: boolean
}) => void

export type ColumnFilterConfig =
  | {
      columnId: string
      searchKey: string
      type?: 'string'
      serialize?: (value: unknown) => unknown
      deserialize?: (value: unknown) => unknown
    }
  | {
      columnId: string
      searchKey: string
      type: 'array'
      serialize?: (value: unknown) => unknown
      deserialize?: (value: unknown) => unknown
    }

export type UseProTableUrlStateParams = {
  search: SearchRecord
  navigate: NavigateFn
  pagination?: {
    pageKey?: string
    pageSizeKey?: string
    defaultPage?: number
    defaultPageSize?: number
  }
  sorting?: {
    sortKey?: string
    orderKey?: string
  }
  columnFilters?: ColumnFilterConfig[]
}

export type UseProTableUrlStateReturn = {
  initialState: Partial<ProTableState>
  onChange: (state: ProTableState) => void
}

export interface ProTableUrlStateConfig {
  pageKey: string
  pageSizeKey: string
  defaultPage: number
  defaultPageSize: number
  sortKey: string
  orderKey: string
  columnFilters: ColumnFilterConfig[]
}
