'use client'

import type { SortDirection } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { tableSortIndicatorClassName, tableSortUnsortedIconClassName } from './classes'

export function ProTableSortIndicator({ sorted }: { sorted: false | SortDirection }) {
  return (
    <span className={tableSortIndicatorClassName} aria-hidden="true">
      {sorted === 'asc' ? (
        <ArrowUp size={14} />
      ) : sorted === 'desc' ? (
        <ArrowDown size={14} />
      ) : (
        <ArrowUpDown size={14} className={tableSortUnsortedIconClassName} />
      )}
    </span>
  )
}
