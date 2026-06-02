import {
  paginationEmphasisClassName,
  paginationMobileTotalClassName,
  paginationSelectedClassName,
} from './classes'
import type { ProTablePaginationLabels } from './types'

interface PaginationTotalProps {
  total: number
  selected: number
  labels?: ProTablePaginationLabels
}

export function PaginationTotal({ total, selected, labels }: PaginationTotalProps) {
  return (
    <span>
      {labels?.total ? (
        labels.total(total)
      ) : (
        <>
          Total <span className={paginationEmphasisClassName}>{total}</span> rows
        </>
      )}
      {selected > 0 && (
        <span className={paginationSelectedClassName}>
          {' · '}
          {labels?.selected ? (
            labels.selected(selected)
          ) : (
            <>
              <span className={paginationEmphasisClassName}>{selected}</span> selected
            </>
          )}
        </span>
      )}
    </span>
  )
}

export function PaginationMobileTotal({ total, selected, labels }: PaginationTotalProps) {
  return (
    <span className={paginationMobileTotalClassName}>
      {labels?.rowsShort ? labels.rowsShort(total) : `${total} rows`}
      {selected > 0 && (
        <>
          {' · '}
          {labels?.selectedShort ? labels.selectedShort(selected) : `${selected} selected`}
        </>
      )}
    </span>
  )
}
