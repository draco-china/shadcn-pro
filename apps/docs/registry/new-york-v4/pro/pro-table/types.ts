import type { ColumnPinningState } from '@tanstack/react-table'

export type TableSize = 'default' | 'middle' | 'compact'

export const cellPadding: Record<TableSize, string> = {
  default: 'py-3',
  middle: 'py-2',
  compact: 'py-1',
}

export type ProTableColumnPinningPosition = 'left' | 'right'

export interface ProTableFilterOption {
  label: string
  value: string
}

export interface ProTableColumnMeta {
  pinned?: ProTableColumnPinningPosition
  /** Provide options to auto-render a Select filter in the toolbar and map value→label in cells */
  filters?: ProTableFilterOption[]
  /** Placeholder for the auto-rendered filter Select */
  filterPlaceholder?: string
  /** Cell display style when filters is set: 'badge' (default) | 'text' */
  filterVariant?: 'badge' | 'text'
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
