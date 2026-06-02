'use client'

import type { RowSelectionState, VisibilityState } from '@tanstack/react-table'
import { useRef, useState } from 'react'
import type { TableSize } from '../types'

export function useProTableUiState() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [tableSize, setTableSize] = useState<TableSize>('default')
  const tableRef = useRef<HTMLTableElement>(null)

  return {
    rowSelection,
    setRowSelection,
    columnVisibility,
    setColumnVisibility,
    tableSize,
    setTableSize,
    tableRef,
  }
}
