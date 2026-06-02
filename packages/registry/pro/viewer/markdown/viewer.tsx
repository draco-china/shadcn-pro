'use client'

import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import {
  markdownEmptyClassName,
  markdownFootnotesClassName,
  markdownMathClassName,
  markdownTaskListClassName,
  markdownViewerClassName,
} from './classes'
import { createMarkdownComponents } from './components'
import { markdownRehypePlugins, markdownRemarkPlugins } from './plugins'
import type { MarkdownViewerProps } from './types'

export function MarkdownViewer({
  content,
  theme = 'dark',
  className,
  emptyText = 'No markdown content',
}: MarkdownViewerProps) {
  const components = useMemo(() => createMarkdownComponents(theme), [theme])

  if (!content.trim()) {
    return <div className={cn(markdownEmptyClassName, className)}>{emptyText}</div>
  }

  return (
    <div
      className={cn(
        markdownViewerClassName,
        markdownTaskListClassName,
        markdownFootnotesClassName,
        markdownMathClassName,
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={markdownRemarkPlugins}
        rehypePlugins={markdownRehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
