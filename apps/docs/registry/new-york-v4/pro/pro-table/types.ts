import type { ColumnPinningState } from '@tanstack/react-table'

export type TableSize = 'default' | 'middle' | 'compact'

export const cellPadding: Record<TableSize, string> = {
  default: 'py-3',
  middle: 'py-2',
  compact: 'py-1',
}

export type ProTableColumnPinningPosition = 'left' | 'right'

export interface ProTableColumnMeta {
  pinned?: ProTableColumnPinningPosition
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> extends ProTableColumnMeta {}
}

export function createColumnPinningState(
  left: string[] = [],
  right: string[] = [],
): ColumnPinningState {
  return { left, right }
}
