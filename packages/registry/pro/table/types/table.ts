import type { ColumnDef, ColumnPinningState } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import type { ProTablePaginationLabels } from '../pagination'
import type { ProTableRequest, ProTableState } from './state'
import type {
  ProTableBulkToolbarOptions,
  ProTableRenderContext,
  ProTableToolbarOptions,
} from './toolbar'

export type TableSize = 'default' | 'middle' | 'compact'

export const cellPadding: Record<TableSize, string> = {
  default: 'py-3',
  middle: 'py-2',
  compact: 'py-1',
}

export type ProTableSearch =
  | false
  | string
  | {
      columnId: string
      placeholder?: string
    }

export type ProTableLayout = 'full' | 'auto'

export interface ProTablePaginationOptions {
  pageSizeOptions?: number[]
  showTotal?: boolean
  showQuickJump?: boolean
  labels?: ProTablePaginationLabels
}

export interface ProTableLoadingOptions {
  rows?: number
}

export interface ProTableEmptyOptions {
  text?: ReactNode
  icon?: ReactNode
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
  header?: ReactNode | ((context: ProTableRenderContext<TData>) => ReactNode)
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

export function createColumnPinningState(
  left: string[] = [],
  right: string[] = [],
): ColumnPinningState {
  return { left, right }
}
