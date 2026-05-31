'use client'

import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

/**
 * Helper to create a selection column for ProTable.
 * Usage: columns = [selectionColumn(), ...yourColumns]
 */
export function selectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    meta: { pinned: 'left', className: 'w-8' },
    enableSorting: false,
    enableHiding: false,
  }
}
