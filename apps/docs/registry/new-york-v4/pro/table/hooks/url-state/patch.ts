import type { ProTableState } from '../../types'
import type { ProTableUrlStateConfig } from './types'

export function getUrlStatePatch(state: ProTableState, config: ProTableUrlStateConfig) {
  const sorting = state.sorting[0]
  const patch: Record<string, unknown> = {
    [config.pageKey]:
      state.pagination.pageIndex + 1 <= config.defaultPage
        ? undefined
        : state.pagination.pageIndex + 1,
    [config.pageSizeKey]:
      state.pagination.pageSize === config.defaultPageSize ? undefined : state.pagination.pageSize,
    [config.sortKey]: sorting?.id,
    [config.orderKey]: sorting ? (sorting.desc ? 'desc' : 'asc') : undefined,
  }

  for (const cfg of config.columnFilters) {
    const found = state.columnFilters.find((filter) => filter.id === cfg.columnId)
    const serialize = cfg.serialize ?? ((value: unknown) => value)

    if (cfg.type === 'array') {
      const value: unknown[] = Array.isArray(found?.value) ? found.value : []
      patch[cfg.searchKey] = value.length > 0 ? serialize(value) : undefined
      continue
    }

    const value = typeof found?.value === 'string' ? found.value : ''
    patch[cfg.searchKey] = value.trim() !== '' ? serialize(value) : undefined
  }

  return patch
}
