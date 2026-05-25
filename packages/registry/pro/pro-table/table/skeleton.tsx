import type { Column } from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { getPinnedColumnClassName, getPinnedColumnStyle } from './utils'

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
        <TableCell className="w-8 pr-0">
          <Skeleton className="h-4 w-4" />
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.id}
          className={getPinnedColumnClassName(column)}
          style={getPinnedColumnStyle(column)}
        >
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}
