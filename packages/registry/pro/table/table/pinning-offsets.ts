import type { Column, Table } from '@tanstack/react-table'

export interface ProTablePinnedColumnOffsets {
  left: Record<string, number>
  right: Record<string, number>
}

export function getPinnedColumnOffsets<TData>({
  table,
  widths,
  dragSort,
}: {
  table: Table<TData>
  widths: Map<string, number>
  dragSort: boolean
}): ProTablePinnedColumnOffsets {
  const next: ProTablePinnedColumnOffsets = { left: {}, right: {} }
  let left = dragSort ? 32 : 0

  for (const column of table.getLeftVisibleLeafColumns()) {
    next.left[column.id] = left
    left += columnWidth(column, widths)
  }

  let right = 0
  const rightColumns = table.getRightVisibleLeafColumns()
  for (let index = rightColumns.length - 1; index >= 0; index -= 1) {
    const column = rightColumns[index]
    next.right[column.id] = right
    right += columnWidth(column, widths)
  }

  return next
}

export function arePinnedColumnOffsetsEqual(
  left: ProTablePinnedColumnOffsets,
  right: ProTablePinnedColumnOffsets,
) {
  return (
    areNumberRecordsEqual(left.left, right.left) && areNumberRecordsEqual(left.right, right.right)
  )
}

function columnWidth<TData>(column: Column<TData, unknown>, widths: Map<string, number>) {
  return widths.get(column.id) ?? column.getSize()
}

function areNumberRecordsEqual(left: Record<string, number>, right: Record<string, number>) {
  let leftCount = 0

  for (const key in left) {
    leftCount += 1
    if (left[key] !== right[key]) return false
  }

  return leftCount === getRecordKeyCount(right)
}

function getRecordKeyCount(record: Record<string, number>) {
  let count = 0
  for (const key in record) {
    if (Object.hasOwn(record, key)) count += 1
  }
  return count
}
