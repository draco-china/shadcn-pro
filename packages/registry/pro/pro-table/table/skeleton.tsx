import type { Column } from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { getColumnMeta, getPinnedColumnClassName, getPinnedColumnStyle } from './utils'

interface ProTableSkeletonRowsProps<TData> {
  rows: number
  columns: Column<TData, unknown>[]
  dragSort?: boolean
}

export function ProTableSkeletonRows<TData>({
  rows,
  columns,
  dragSort,
}: ProTableSkeletonRowsProps<TData>) {
  return Array.from({ length: rows }).map((_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are positional
    <TableRow key={index}>
      {dragSort && (
        <TableCell className="sticky left-0 z-20 w-8 bg-background pr-0">
          <Skeleton className="size-4" />
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.id}
          className={getPinnedColumnClassName(column, getColumnMeta(column)?.className)}
          style={getPinnedColumnStyle(column, dragSort ? 32 : 0)}
        >
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}
