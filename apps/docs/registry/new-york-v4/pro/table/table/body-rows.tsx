import type { Row } from '@tanstack/react-table'
import { BodyRow } from './body-row'
import type { ProTablePinnedColumnOffsets } from './pinning'

export function BodyRows<TData>({
  rows,
  dragSort,
  paddingClass,
  pinnedOffsets,
}: {
  rows: Row<TData>[]
  dragSort?: boolean
  paddingClass: string
  pinnedOffsets: ProTablePinnedColumnOffsets
}) {
  return (
    <>
      {rows.map((row) => (
        <BodyRow
          key={row.id}
          row={row}
          dragSort={dragSort}
          paddingClass={paddingClass}
          pinnedOffsets={pinnedOffsets}
        />
      ))}
    </>
  )
}
