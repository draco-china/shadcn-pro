import type { Column } from '@tanstack/react-table'

export function getColumnMeta<TData>(column: Column<TData, unknown>) {
  return column.columnDef.meta
}

export function getColumnAlignClassName<TData>(
  column: Column<TData, unknown>,
  target: 'header' | 'cell',
) {
  const pinned = column.getIsPinned()
  const align = getColumnMeta(column)?.align ?? (pinned === 'right' ? 'right' : pinned || undefined)

  if (target === 'header') {
    if (align === 'center') return 'text-center [&>div]:justify-center'
    if (align === 'right') return 'text-right [&>div]:justify-end'
    if (align === 'left') return 'text-left [&>div]:justify-start'
    return undefined
  }

  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  if (align === 'left') return 'text-left'
  return undefined
}
