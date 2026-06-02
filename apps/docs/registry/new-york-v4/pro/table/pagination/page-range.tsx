import {
  paginationCompactEllipsisClassName,
  paginationDesktopItemClassName,
  paginationMobileItemClassName,
  paginationMobileRangeClassName,
} from './classes'
import { PaginationEllipsis, PaginationItem } from './elements'
import { NavigationLink } from './navigation-link'
import type { ProTablePaginationLabels } from './types'

export function PaginationPageRange({
  current,
  pageRange,
  labels,
  onPageChange,
}: {
  current: number
  pageRange: Array<number | '...'>
  labels?: ProTablePaginationLabels
  onPageChange: (page: number) => void
}) {
  return (
    <>
      {pageRange.map((page, index) =>
        page === '...' ? (
          <PaginationItem
            // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis positions are stable
            key={`ellipsis-${index}`}
            className={paginationDesktopItemClassName}
          >
            <PaginationEllipsis className={paginationCompactEllipsisClassName} />
          </PaginationItem>
        ) : (
          <PaginationItem key={page} className={paginationDesktopItemClassName}>
            <NavigationLink
              active={page === current}
              label={labels?.page?.(page) ?? `Page ${page}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </NavigationLink>
          </PaginationItem>
        ),
      )}
    </>
  )
}

export function PaginationMobileRange({
  current,
  pageCount,
}: {
  current: number
  pageCount: number
}) {
  return (
    <PaginationItem className={paginationMobileItemClassName}>
      <span className={paginationMobileRangeClassName}>
        {current} / {pageCount}
      </span>
    </PaginationItem>
  )
}
