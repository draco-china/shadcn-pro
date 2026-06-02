import type { ReactNode } from 'react'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import type { ProTableRenderContext } from '../types'
import { tableViewHeaderClassName } from './classes'

export function ProTableViewHeader<TData>({
  header,
  context,
}: {
  header?: ReactNode | ((context: ProTableRenderContext<TData>) => ReactNode)
  context: ProTableRenderContext<TData>
}) {
  const content = typeof header === 'function' ? header(context) : header

  return isRenderableNode(content) ? (
    <div className={tableViewHeaderClassName}>{content}</div>
  ) : null
}
