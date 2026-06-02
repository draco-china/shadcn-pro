import type { ProTableUrlStateConfig, UseProTableUrlStateParams } from './types'

export function getUrlStateConfig({
  pagination,
  sorting,
  columnFilters,
}: Pick<UseProTableUrlStateParams, 'columnFilters' | 'pagination' | 'sorting'>) {
  return {
    pageKey: pagination?.pageKey ?? 'page',
    pageSizeKey: pagination?.pageSizeKey ?? 'pageSize',
    defaultPage: pagination?.defaultPage ?? 1,
    defaultPageSize: pagination?.defaultPageSize ?? 10,
    sortKey: sorting?.sortKey ?? 'sort',
    orderKey: sorting?.orderKey ?? 'order',
    columnFilters: columnFilters ?? [],
  } satisfies ProTableUrlStateConfig
}
