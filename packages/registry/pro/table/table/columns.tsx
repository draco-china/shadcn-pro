'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { CheckboxControl } from '@/components/pro/base/fields/checkbox/control'
import { tableSelectionCheckboxClassName } from './classes'

/**
 * Helper to create a selection column for ProTable.
 * Usage: columns = [selectionColumn(), ...yourColumns]
 */
export function selectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <CheckboxControl
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className={tableSelectionCheckboxClassName}
      />
    ),
    cell: ({ row }) => (
      <CheckboxControl
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className={tableSelectionCheckboxClassName}
      />
    ),
    enableSorting: false,
  }
}
