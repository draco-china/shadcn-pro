import { MoreHorizontalIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { buttonVariants, type ProButtonSize } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  paginationContentClassName,
  paginationEllipsisClassName,
  paginationEllipsisIconClassName,
  paginationEllipsisTextClassName,
} from './classes'

export type PaginationContentProps = HTMLAttributes<HTMLUListElement>
export type PaginationItemProps = HTMLAttributes<HTMLLIElement>
export interface PaginationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  size?: ProButtonSize
}
export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>

export function PaginationContent({ className, ...props }: PaginationContentProps) {
  return (
    <ul
      data-slot="pro-table-pagination-content"
      className={cn(paginationContentClassName, className)}
      {...props}
    />
  )
}

export function PaginationItem(props: PaginationItemProps) {
  return <li data-slot="pro-table-pagination-item" {...props} />
}

export function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pro-table-pagination-link"
      data-active={isActive}
      className={buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
        className,
      })}
      {...props}
    />
  )
}

export function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      aria-hidden
      data-slot="pro-table-pagination-ellipsis"
      className={cn(paginationEllipsisClassName, className)}
      {...props}
    >
      <MoreHorizontalIcon className={paginationEllipsisIconClassName} />
      <span className={paginationEllipsisTextClassName}>More pages</span>
    </span>
  )
}
