import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import {
  markdownTableBodyClassName,
  markdownTableCellClassName,
  markdownTableClassName,
  markdownTableHeadClassName,
  markdownTableWrapperClassName,
} from './classes'
import { getTableAlignClass, withoutMarkdownNode } from './utils'

export const MarkdownTable: NonNullable<Components['table']> = (props) => {
  const { children, ...elementProps } = withoutMarkdownNode(props)
  return (
    <div className={markdownTableWrapperClassName}>
      <table className={markdownTableClassName} {...elementProps}>
        {children}
      </table>
    </div>
  )
}

export const MarkdownTableBody: NonNullable<Components['tbody']> = (props) => {
  const { className, ...elementProps } = withoutMarkdownNode(props)
  return <tbody className={cn(markdownTableBodyClassName, className)} {...elementProps} />
}

export const MarkdownTableCell: NonNullable<Components['td']> = (props) => {
  const { className, align, ...elementProps } = withoutMarkdownNode(props)
  return (
    <td
      align={align}
      className={cn(markdownTableCellClassName, getTableAlignClass(align), className)}
      {...elementProps}
    />
  )
}

export const MarkdownTableHead: NonNullable<Components['th']> = (props) => {
  const { className, align, ...elementProps } = withoutMarkdownNode(props)
  return (
    <th
      align={align}
      className={cn(markdownTableHeadClassName, getTableAlignClass(align), className)}
      {...elementProps}
    />
  )
}
