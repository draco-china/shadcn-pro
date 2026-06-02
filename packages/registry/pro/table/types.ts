import type { RankingInfo } from '@tanstack/match-sorter-utils'
import type { ProTableColumnMeta } from './types/column'

export type {
  ProTableColumnAlign,
  ProTableColumnFilter,
  ProTableColumnMeta,
  ProTableColumnPinningPosition,
  ProTableColumnSearch,
  ProTableFilterOption,
} from './types/column'
export type {
  ProTableRequest,
  ProTableRequestParams,
  ProTableState,
} from './types/state'
export type {
  ProTableDragSortOptions,
  ProTableEmptyOptions,
  ProTableLayout,
  ProTableLoadingOptions,
  ProTablePaginationOptions,
  ProTableProps,
  ProTableSearch,
  ProTableTableOptions,
  TableSize,
} from './types/table'
export {
  cellPadding,
  createColumnPinningState,
} from './types/table'
export type {
  ProTableAction,
  ProTableBulkToolbarOptions,
  ProTableRenderContext,
  ProTableToolbarOptions,
} from './types/toolbar'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> extends ProTableColumnMeta<TData> {}
  interface FilterMeta {
    itemRank?: RankingInfo
  }
}
