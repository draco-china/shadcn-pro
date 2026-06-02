import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import {
  tableBodyClassName,
  tableCellClassName,
  tableElementClassName,
  tableHeadCellClassName,
  tableHeaderClassName,
  tableRowClassName,
  tableSkeletonClassName,
} from './classes'
import type {
  ProTableCellProps,
  ProTableElementProps,
  ProTableHeadCellProps,
  ProTableRowProps,
  ProTableSectionProps,
  ProTableSkeletonProps,
} from './element-types'

export type {
  ProTableCellProps,
  ProTableElementProps,
  ProTableHeadCellProps,
  ProTableRowProps,
  ProTableSectionProps,
  ProTableSkeletonProps,
} from './element-types'

export const ProTableElement = forwardRef(function ProTableElement(
  { className, ...props }: ProTableElementProps,
  ref: ForwardedRef<HTMLTableElement>,
) {
  return (
    <table
      ref={ref}
      data-slot="pro-table"
      className={cn(tableElementClassName, className)}
      {...props}
    />
  )
})

export function ProTableHeaderElement({ className, ...props }: ProTableSectionProps) {
  return (
    <thead
      data-slot="pro-table-header"
      className={cn(tableHeaderClassName, className)}
      {...props}
    />
  )
}

export function ProTableBodyElement({ className, ...props }: ProTableSectionProps) {
  return (
    <tbody data-slot="pro-table-body" className={cn(tableBodyClassName, className)} {...props} />
  )
}

export const ProTableRowElement = forwardRef(function ProTableRowElement(
  { className, ...props }: ProTableRowProps,
  ref: ForwardedRef<HTMLTableRowElement>,
) {
  return (
    <tr
      ref={ref}
      data-slot="pro-table-row"
      className={cn(tableRowClassName, className)}
      {...props}
    />
  )
})

export function ProTableHeadCell({ className, ...props }: ProTableHeadCellProps) {
  return (
    <th
      data-slot="pro-table-head-cell"
      className={cn(tableHeadCellClassName, className)}
      {...props}
    />
  )
}

export function ProTableCell({ className, ...props }: ProTableCellProps) {
  return <td data-slot="pro-table-cell" className={cn(tableCellClassName, className)} {...props} />
}

export function ProTableSkeleton({ className, ...props }: ProTableSkeletonProps) {
  return (
    <div
      data-slot="pro-table-skeleton"
      className={cn(tableSkeletonClassName, className)}
      {...props}
    />
  )
}
