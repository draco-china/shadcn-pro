'use client'

import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'
import type { ProTableProps, ProTableRequest } from '../types'
import type { ProTableStateController } from './state'
import { useProTableState, useProTableStateChange } from './state'

export interface RequestTableController<TData> extends ProTableStateController {
  data: TData[]
  setData: Dispatch<SetStateAction<TData[]>>
  requestLoading: boolean
  requestError: unknown
  requestTotal?: number
}

interface RequestTableProps<TData, TValue>
  extends Pick<ProTableProps<TData, TValue>, 'initialState' | 'onChange'> {
  data?: TData[]
  request: ProTableRequest<TData>
  children: (controller: RequestTableController<TData>) => ReactNode
}

export function RequestTable<TData, TValue>({
  data,
  request,
  initialState,
  onChange,
  children,
}: RequestTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(data ?? [])
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState<unknown>()
  const [requestTotal, setRequestTotal] = useState<number>()
  const tableState = useProTableState(initialState)

  useProTableStateChange(onChange, tableState.state)

  useEffect(() => {
    let canceled = false
    setRequestLoading(true)
    setRequestError(undefined)
    Promise.resolve(request(tableState.state))
      .then((result) => {
        if (canceled) return
        setTableData(result.data)
        setRequestTotal(result.total)
      })
      .catch((error: unknown) => {
        if (canceled) return
        setRequestError(error)
        setTableData([])
        setRequestTotal(undefined)
      })
      .finally(() => {
        if (!canceled) setRequestLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [request, tableState.state])

  return children({
    ...tableState,
    data: tableData,
    setData: setTableData,
    requestLoading,
    requestError,
    requestTotal,
  })
}
