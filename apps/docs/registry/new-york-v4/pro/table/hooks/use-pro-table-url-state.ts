'use client'

import { useCallback, useMemo } from 'react'
import type { ProTableState } from '../types'
import { getUrlStateConfig } from './url-state/config'
import { getInitialUrlTableState } from './url-state/parse'
import { getUrlStatePatch } from './url-state/patch'
import type { UseProTableUrlStateParams, UseProTableUrlStateReturn } from './url-state/types'

export type {
  ColumnFilterConfig,
  NavigateFn,
  SearchRecord,
  UseProTableUrlStateParams,
  UseProTableUrlStateReturn,
} from './url-state/types'

export function useProTableUrlState(params: UseProTableUrlStateParams): UseProTableUrlStateReturn {
  const {
    search,
    navigate,
    pagination: paginationCfg,
    sorting: sortingCfg,
    columnFilters: columnFiltersCfg,
  } = params

  const config = useMemo(
    () =>
      getUrlStateConfig({
        pagination: paginationCfg,
        sorting: sortingCfg,
        columnFilters: columnFiltersCfg,
      }),
    [columnFiltersCfg, paginationCfg, sortingCfg],
  )

  const initialState = useMemo<Partial<ProTableState>>(
    () => getInitialUrlTableState(search, config),
    [config, search],
  )

  const onChange = useCallback(
    (state: ProTableState) => {
      const patch = getUrlStatePatch(state, config)

      navigate({
        search: (prev) => ({
          ...prev,
          ...patch,
        }),
      })
    },
    [config, navigate],
  )

  return { initialState, onChange }
}
