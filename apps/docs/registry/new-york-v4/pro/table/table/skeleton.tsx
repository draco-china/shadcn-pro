import type { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  tableSkeletonCellClassName,
  tableSkeletonDragCellClassName,
  tableSkeletonDragHandleClassName,
  tableSkeletonRowClassName,
} from './classes'
import { getColumnMeta } from './column-align'
import { ProTableCell, ProTableRowElement, ProTableSkeleton } from './elements'
import {
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './pinning'

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
    <ProTableRowElement key={index} className={tableSkeletonRowClassName}>
      {dragSort && (
        <ProTableCell className={tableSkeletonDragCellClassName}>
          <ProTableSkeleton className={tableSkeletonDragHandleClassName} />
        </ProTableCell>
      )}
      {columns.map((column) => (
        <ProTableCell
          key={column.id}
          className={getPinnedColumnClassName(
            column,
            cn('transition-colors duration-150', getColumnMeta(column)?.className),
          )}
          style={getPinnedColumnStyle(column, pinnedOffsets, dragSort ? 32 : 0)}
          data-pro-table-column-id={column.id}
        >
          <ProTableSkeleton className={tableSkeletonCellClassName} />
        </ProTableCell>
      ))}
    </ProTableRowElement>
  ))
}
