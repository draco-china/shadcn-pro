'use client'

import type { Column, Table } from '@tanstack/react-table'
import { type CSSProperties, type RefObject, useLayoutEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import {
  tablePinnedCellClassName,
  tablePinnedLeftShadowClassName,
  tablePinnedRightShadowClassName,
} from './classes'
import { getTableColumnWidths, observeTableColumnWidths } from './pinning-observer'
import {
  arePinnedColumnOffsetsEqual,
  getPinnedColumnOffsets,
  type ProTablePinnedColumnOffsets,
} from './pinning-offsets'

export type { ProTablePinnedColumnOffsets } from './pinning-offsets'

export function getPinnedColumnClassName<TData>(
  column: Column<TData, unknown>,
  className?: string,
) {
  const pinned = column.getIsPinned()
  const isLastLeft = pinned === 'left' && column.getIsLastColumn('left')
  const isFirstRight = pinned === 'right' && column.getIsFirstColumn('right')

  return cn(
    pinned && tablePinnedCellClassName,
    isLastLeft && tablePinnedLeftShadowClassName,
    isFirstRight && tablePinnedRightShadowClassName,
    className,
  )
}

export function getPinnedColumnStyle<TData>(
  column: Column<TData, unknown>,
  offsets?: ProTablePinnedColumnOffsets,
  leftOffset = 0,
): CSSProperties {
  const pinned = column.getIsPinned()
  const style: CSSProperties = {}

  if (pinned === 'left') {
    style.left = `${offsets?.left[column.id] ?? column.getStart('left') + leftOffset}px`
  }

  if (pinned === 'right') {
    style.right = `${offsets?.right[column.id] ?? column.getAfter('right')}px`
  }

  return style
}

export function useProTablePinnedColumnOffsets<TData>(
  table: Table<TData>,
  tableRef: RefObject<HTMLTableElement | null>,
  dragSort: boolean,
): ProTablePinnedColumnOffsets {
  const [offsets, setOffsets] = useState<ProTablePinnedColumnOffsets>({
    left: {},
    right: {},
  })
  const visibleColumnKey = table
    .getVisibleLeafColumns()
    .map((column) => column.id)
    .join('\0')
  const leftPinnedKey = table.getState().columnPinning.left?.join('\0') ?? ''
  const rightPinnedKey = table.getState().columnPinning.right?.join('\0') ?? ''

  useLayoutEffect(() => {
    const tableElement = tableRef.current
    if (!tableElement) return

    const updateOffsets = () => {
      const widths = getTableColumnWidths(tableElement)
      const next = getPinnedColumnOffsets({ table, widths, dragSort })
      setOffsets((current) => (arePinnedColumnOffsetsEqual(current, next) ? current : next))
    }

    updateOffsets()
    return observeTableColumnWidths(tableElement, updateOffsets)
  }, [dragSort, leftPinnedKey, rightPinnedKey, table, tableRef, visibleColumnKey])

  return offsets
}
