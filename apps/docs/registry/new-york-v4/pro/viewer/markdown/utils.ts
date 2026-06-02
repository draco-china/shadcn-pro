import { isValidElement } from 'react'
import type { MarkdownNode } from './types'

export function withoutMarkdownNode<TProps extends { node?: unknown }>(props: TProps) {
  const { node: _node, ...elementProps } = props
  return elementProps
}

export function walkMarkdownNode(node: MarkdownNode, visitor: (node: MarkdownNode) => void) {
  visitor(node)
  if (!node.children) return
  for (const child of node.children) walkMarkdownNode(child, visitor)
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function getNodeText(children: unknown): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getNodeText).join('')
  if (isValidElement<{ children?: unknown }>(children)) return getNodeText(children.props.children)
  return ''
}

export function getTableAlignClass(align?: string) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}
