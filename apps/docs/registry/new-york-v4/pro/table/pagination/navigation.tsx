import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { PaginationContent } from './elements'
import { PaginationNavigationControl } from './navigation-control'
import { PaginationMobileRange, PaginationPageRange } from './page-range'
import type { ProTablePaginationLabels } from './types'

interface PaginationNavigationProps {
  current: number
  pageCount: number
  pageRange: Array<number | '...'>
  canPrevious: boolean
  canNext: boolean
  labels?: ProTablePaginationLabels
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

export function PaginationNavigation({
  current,
  pageCount,
  pageRange,
  canPrevious,
  canNext,
  labels,
  onPageChange,
  onPrevious,
  onNext,
}: PaginationNavigationProps) {
  return (
    <PaginationContent>
      <PaginationNavigationControl
        disabled={!canPrevious}
        label={labels?.first ?? 'First page'}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft size={14} />
      </PaginationNavigationControl>
      <PaginationNavigationControl
        disabled={!canPrevious}
        label={labels?.previous ?? 'Previous page'}
        onClick={onPrevious}
      >
        <ChevronLeft size={14} />
      </PaginationNavigationControl>
      <PaginationPageRange
        current={current}
        pageRange={pageRange}
        labels={labels}
        onPageChange={onPageChange}
      />
      <PaginationMobileRange current={current} pageCount={pageCount} />
      <PaginationNavigationControl
        disabled={!canNext}
        label={labels?.next ?? 'Next page'}
        onClick={onNext}
      >
        <ChevronRight size={14} />
      </PaginationNavigationControl>
      <PaginationNavigationControl
        disabled={!canNext}
        label={labels?.last ?? 'Last page'}
        onClick={() => onPageChange(pageCount)}
      >
        <ChevronsRight size={14} />
      </PaginationNavigationControl>
    </PaginationContent>
  )
}
