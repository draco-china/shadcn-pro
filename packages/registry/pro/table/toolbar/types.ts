import type { ColumnPinningState, Row, Table } from '@tanstack/react-table'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { ProTableSearch, TableSize } from '../types'

export interface ProTableToolbarLabels {
  search?: string
  reset?: string
  refresh?: string
  columns?: string
  density?: string
  densityOptions?: Partial<Record<TableSize, string>>
}

export interface ProTableToolbarContext<TData> {
  table: Table<TData>
  rows: Row<TData>[]
  selectedRows: Row<TData>[]
  tableSize: TableSize
}

export interface ProTableToolbarProps<TData> {
  table: Table<TData>
  defaultColumnOrder: string[]
  defaultColumnPinning: ColumnPinningState
  search?: ProTableSearch
  filters?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  actions?: ProToolbarItem<ProTableToolbarContext<TData>>[]
  columns?: boolean
  density?: boolean
  refresh?: () => void
  disabled?: boolean
  tableSize?: TableSize
  onTableSizeChange?: (size: TableSize) => void
  labels?: ProTableToolbarLabels
  context: ProTableToolbarContext<TData>
}
