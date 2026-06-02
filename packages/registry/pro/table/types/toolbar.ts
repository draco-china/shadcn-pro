import type { Row, Table as TanStackTable } from '@tanstack/react-table'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { ProTableToolbarLabels } from '../toolbar'
import type { ProTableSearch, TableSize } from './table'

export interface ProTableRenderContext<TData> {
  table: TanStackTable<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
  tableSize: TableSize
}

export type ProTableAction<TData> = ProToolbarItem<ProTableRenderContext<TData>>

export interface ProTableToolbarOptions<TData> {
  search?: ProTableSearch
  filters?: ProToolbarItem<ProTableRenderContext<TData>>[]
  actions?: ProTableAction<TData>[]
  options?:
    | false
    | {
        refresh?: false | (() => void)
        density?: boolean
        columns?: boolean
      }
  labels?: ProTableToolbarLabels
}

export interface ProTableBulkToolbarOptions<TData> {
  actions?: ProTableAction<TData>[]
  entityName?: string
}
