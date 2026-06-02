import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import {
  markdownKeyboardClassName,
  markdownLinkClassName,
  markdownStrongClassName,
  markdownSupClassName,
} from './classes'
import { withoutMarkdownNode } from './utils'

export const markdownInlineElements: Pick<Components, 'a' | 'kbd' | 'strong' | 'sup'> = {
  a: (props) => {
    const { className, children, ...elementProps } = withoutMarkdownNode(props)
    return (
      <a
        className={cn(markdownLinkClassName, className)}
        rel="noreferrer"
        target="_blank"
        {...elementProps}
      >
        {children}
      </a>
    )
  },
  kbd: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <kbd className={cn(markdownKeyboardClassName, className)} {...elementProps} />
  },
  strong: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <strong className={cn(markdownStrongClassName, className)} {...elementProps} />
  },
  sup: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <sup className={cn(markdownSupClassName, className)} {...elementProps} />
  },
}
