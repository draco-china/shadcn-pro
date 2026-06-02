import { compareItems } from '@tanstack/match-sorter-utils'
import { getSortedRowModel, type Row, type RowModel, type Table } from '@tanstack/react-table'

export function getRankedSortedRowModel<TData>() {
  const sortedRowModel = getSortedRowModel<TData>()

  return (table: Table<TData>) => {
    const getSorted = sortedRowModel(table)

    return () => {
      const rowModel = getSorted()
      if (table.options.manualSorting || table.getState().sorting.length > 0) return rowModel

      return getRankedRowModel(rowModel)
    }
  }
}

function getRankedRowModel<TData>(rowModel: RowModel<TData>): RowModel<TData> {
  const rankedColumnId = getRankedColumnId(rowModel.rows)
  if (!rankedColumnId) return rowModel

  const rows = sortRowsByRank(rowModel.rows, rankedColumnId)
  const flatRows = sortRowsByRank(rowModel.flatRows, rankedColumnId)
  return { ...rowModel, rows, flatRows }
}

function getRankedColumnId<TData>(rows: Row<TData>[]) {
  for (const row of rows) {
    for (const columnId in row.columnFiltersMeta) {
      if (row.columnFiltersMeta[columnId]?.itemRank) return columnId
    }
  }
  return undefined
}

function sortRowsByRank<TData>(rows: Row<TData>[], columnId: string) {
  return [...rows].sort((rowA, rowB) => {
    const rankA = rowA.columnFiltersMeta[columnId]?.itemRank
    const rankB = rowB.columnFiltersMeta[columnId]?.itemRank

    if (rankA && rankB) {
      const rankSort = compareItems(rankA, rankB)
      if (rankSort !== 0) return rankSort
    }

    if (rankA) return -1
    if (rankB) return 1
    return rowA.index - rowB.index
  })
}
