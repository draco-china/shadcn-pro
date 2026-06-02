import type { ReactNode } from 'react'
import type { ArrayFieldUpdate } from './use-array-field'

export interface ArrayFieldProps<TItem extends object = Record<string, unknown>> {
  /** Controlled value */
  value?: TItem[]
  /** Called with the new array on any change */
  onChange?: (value: TItem[]) => void
  /** Default value for uncontrolled usage */
  defaultValue?: TItem[]
  /** Factory for a blank new item */
  newItem: () => TItem
  /** Render the editable content of each item */
  renderItem: (
    item: TItem,
    index: number,
    helpers: {
      update: (next: ArrayFieldUpdate<TItem>) => void
      remove: () => void
    },
  ) => ReactNode
  /** Label for the Add button */
  addText?: ReactNode
  /** Maximum number of items (Add button hidden when reached) */
  max?: number
  /** Minimum number of items (Remove button hidden when at min) */
  min?: number
  disabled?: boolean
  className?: string
}
