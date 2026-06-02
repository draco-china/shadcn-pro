export type ProTableColumnPinningPosition = 'left' | 'right'
export type ProTableColumnAlign = 'left' | 'center' | 'right'

export interface ProTableFilterOption {
  label: string
  value: string
}

export type ProTableColumnSearch =
  | boolean
  | {
      placeholder?: string
    }

export interface ProTableColumnFilter<TData = unknown> {
  options: ProTableFilterOption[]
  placeholder?: string
  multiple?: boolean
  variant?: 'badge' | 'text'
  onFilter?: (value: string, record: TData) => boolean
}

export interface ProTableColumnMeta<TData = unknown> {
  pinned?: ProTableColumnPinningPosition
  /** Align header and cell content. */
  align?: ProTableColumnAlign
  /** Class applied to header, body, and skeleton cells. Use width utilities here when needed. */
  className?: string
  /** Enable the toolbar search input from this column. */
  search?: ProTableColumnSearch
  /** Auto-render a FacetedFilter in the toolbar and map value→label in cells. */
  filter?: ProTableColumnFilter<TData>
}
