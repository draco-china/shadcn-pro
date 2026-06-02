'use client'

import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'
import type { ProTableProps } from '../types'
import type { ProTableStateController } from './state'
import { useProTableState, useProTableStateChange } from './state'

export interface DataTableController<TData> extends ProTableStateController {
  data: TData[]
  setData: Dispatch<SetStateAction<TData[]>>
}

interface DataTableProps<TData, TValue>
  extends Pick<ProTableProps<TData, TValue>, 'initialState' | 'onChange'> {
  data?: TData[]
  children: (controller: DataTableController<TData>) => ReactNode
}

export function DataTable<TData, TValue>({
  data,
  initialState,
  onChange,
  children,
}: DataTableProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(data ?? [])
  const tableState = useProTableState(initialState)

  useEffect(() => {
    setTableData(data ?? [])
  }, [data])

  useProTableStateChange(onChange, tableState.state)

  return children({ ...tableState, data: tableData, setData: setTableData })
}
