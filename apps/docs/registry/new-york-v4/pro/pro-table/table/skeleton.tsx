import type { Column } from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  getColumnMeta,
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './utils'

interface ProTableSkeletonRowsProps<TData> {
  rows: number
  columns: Column<TData, unknown>[]
  dragSort?: boolean
  pinnedOffsets: ProTablePinnedColumnOffsets
}

export function ProTableSkeletonRows<TData>({
  rows,
  columns,
  dragSort,
  pinnedOffsets,
}: ProTableSkeletonRowsProps<TData>) {
  return Array.from({ length: rows }).map((_, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are positional
    <TableRow key={index} className="group transition-colors duration-150 hover:bg-muted">
      {dragSort && (
        <TableCell className="sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))] transition-colors duration-150 group-hover:bg-muted">
          <Skeleton className="size-4" />
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.id}
          className={getPinnedColumnClassName(
            column,
            cn('transition-colors duration-150', getColumnMeta(column)?.className),
          )}
          style={getPinnedColumnStyle(column, pinnedOffsets, dragSort ? 32 : 0)}
          data-pro-table-column-id={column.id}
        >
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}
