import { type Cell, flexRender } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { AutoFilterCell } from '../toolbar'
import { getFacetedFilterValue } from '../toolbar/utils'
import { getColumnAlignClassName, getColumnMeta } from './column-align'
import { ProTableCell } from './elements'
import {
  getPinnedColumnClassName,
  getPinnedColumnStyle,
  type ProTablePinnedColumnOffsets,
} from './pinning'

export function BodyCell<TData>({
  cell,
  dragSort,
  paddingClass,
  pinnedOffsets,
}: {
  cell: Cell<TData, unknown>
  dragSort?: boolean
  paddingClass: string
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  const meta = getColumnMeta(cell.column)
  const filter = meta?.filter
  const autoRender = filter && cell.column.columnDef.cell === undefined

  return (
    <ProTableCell
      className={getPinnedColumnClassName(
        cell.column,
        cn(paddingClass, getColumnAlignClassName(cell.column, 'cell'), meta?.className),
      )}
      style={getPinnedColumnStyle(cell.column, pinnedOffsets, dragSort ? 32 : 0)}
      data-pro-table-column-id={cell.column.id}
    >
      {autoRender ? (
        <AutoFilterCell
          value={getFacetedFilterValue(cell.getValue())}
          options={filter.options}
          variant={filter.variant}
        />
      ) : (
        flexRender(cell.column.columnDef.cell, cell.getContext())
      )}
    </ProTableCell>
  )
}
