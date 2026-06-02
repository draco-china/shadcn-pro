import type { Row } from '@tanstack/react-table'
import { BodyCell } from './body-cell'
import { tableInteractiveRowClassName } from './classes'
import { ProTableRowElement } from './elements'
import type { ProTablePinnedColumnOffsets } from './pinning'
import { SortableRow } from './sortable-row'

export function BodyRow<TData>({
  row,
  dragSort,
  paddingClass,
  pinnedOffsets,
}: {
  row: Row<TData>
  dragSort?: boolean
  paddingClass: string
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  const cells = row
    .getVisibleCells()
    .map((cell) => (
      <BodyCell
        key={cell.id}
        cell={cell}
        dragSort={dragSort}
        paddingClass={paddingClass}
        pinnedOffsets={pinnedOffsets}
      />
    ))

  if (dragSort) {
    return (
      <SortableRow row={row} paddingClass={paddingClass}>
        {cells}
      </SortableRow>
    )
  }

  return (
    <ProTableRowElement
      data-state={row.getIsSelected() && 'selected'}
      className={tableInteractiveRowClassName}
    >
      {cells}
    </ProTableRowElement>
  )
}
