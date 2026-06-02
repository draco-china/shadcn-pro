import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'

export interface ProTableState {
  pagination: PaginationState
  sorting: SortingState
  columnFilters: ColumnFiltersState
}

export interface ProTableRequestParams extends ProTableState {}

export type ProTableRequest<TData> = (
  params: ProTableRequestParams,
) => Promise<{ data: TData[]; total?: number }> | { data: TData[]; total?: number }
