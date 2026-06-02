import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { ProTableEmptyOptions } from '../types'
import { tableEmptyCellClassName } from './classes'
import { ProTableCell, ProTableRowElement } from './elements'
import { ProTableEmptyState } from './empty-state'

export function EmptyRow({
  colSpan,
  fill,
  empty,
  fallbackText,
}: {
  colSpan: number
  fill: boolean
  empty?: ProTableEmptyOptions
  fallbackText?: ReactNode
}) {
  return (
    <ProTableRowElement className={fill ? 'h-full' : undefined}>
      <ProTableCell colSpan={colSpan} className={cn(tableEmptyCellClassName, fill && 'h-full')}>
        <ProTableEmptyState empty={empty} fallbackText={fallbackText} />
      </ProTableCell>
    </ProTableRowElement>
  )
}
