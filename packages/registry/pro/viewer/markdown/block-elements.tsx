import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import {
  markdownBlockquoteClassName,
  markdownDetailsClassName,
  markdownHrClassName,
  markdownImageClassName,
  markdownListItemClassName,
  markdownOrderedListClassName,
  markdownParagraphClassName,
  markdownSummaryClassName,
  markdownUnorderedListClassName,
} from './classes'
import { withoutMarkdownNode } from './utils'

export const markdownBlockElements: Pick<
  Components,
  'blockquote' | 'details' | 'hr' | 'img' | 'li' | 'ol' | 'p' | 'pre' | 'summary' | 'ul'
> = {
  blockquote: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <blockquote className={cn(markdownBlockquoteClassName, className)} {...elementProps} />
  },
  details: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <details className={cn(markdownDetailsClassName, className)} {...elementProps} />
  },
  hr: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <hr className={cn(markdownHrClassName, className)} {...elementProps} />
  },
  img: (props) => {
    const { className, alt, ...elementProps } = withoutMarkdownNode(props)
    return (
      <img className={cn(markdownImageClassName, className)} alt={alt ?? ''} {...elementProps} />
    )
  },
  li: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <li className={cn(markdownListItemClassName, className)} {...elementProps} />
  },
  ol: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <ol className={cn(markdownOrderedListClassName, className)} {...elementProps} />
  },
  p: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <p className={cn(markdownParagraphClassName, className)} {...elementProps} />
  },
  pre: ({ children }) => <>{children}</>,
  summary: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <summary className={cn(markdownSummaryClassName, className)} {...elementProps} />
  },
  ul: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <ul className={cn(markdownUnorderedListClassName, className)} {...elementProps} />
  },
}
