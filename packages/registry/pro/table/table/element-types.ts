import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

export type ProTableElementProps = TableHTMLAttributes<HTMLTableElement>
export type ProTableSectionProps = HTMLAttributes<HTMLTableSectionElement>
export type ProTableRowProps = HTMLAttributes<HTMLTableRowElement>
export type ProTableHeadCellProps = ThHTMLAttributes<HTMLTableCellElement>
export type ProTableCellProps = TdHTMLAttributes<HTMLTableCellElement>
export type ProTableSkeletonProps = HTMLAttributes<HTMLDivElement>
