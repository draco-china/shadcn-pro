import type { ReactNode } from 'react'

export interface ProTablePaginationLabels {
  total?: (total: number) => ReactNode
  selected?: (selected: number) => ReactNode
  rows?: string
  rowsShort?: (total: number) => ReactNode
  selectedShort?: (selected: number) => ReactNode
  first?: string
  previous?: string
  next?: string
  last?: string
  page?: (page: number) => string
  goTo?: string
}
