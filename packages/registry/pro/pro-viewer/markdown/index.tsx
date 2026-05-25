'use client'

import type { ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { DEFAULT_VIEWER_THEME, type ViewerTheme } from '../code/syntax'
import { createMarkdownComponents } from './components'
import { markdownRehypePlugins, markdownRemarkPlugins } from './plugins'

export interface MarkdownViewerProps {
  content: string
  theme?: ViewerTheme
  className?: string
  emptyText?: string
}

type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>

export function MarkdownViewer({
  content,
  theme = DEFAULT_VIEWER_THEME,
  className,
  emptyText = 'No markdown content',
}: MarkdownViewerProps) {
  if (!content.trim()) {
    return <div className={cn('text-sm text-muted-foreground', className)}>{emptyText}</div>
  }

  return (
    <div
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:scroll-m-20 prose-headings:font-semibold',
        'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg',
        'prose-a:text-primary prose-a:underline prose-a:underline-offset-4',
        'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
        'prose-img:rounded-md',
        'prose-hr:border-border',
        'prose-pre:my-0 prose-pre:bg-transparent prose-pre:p-0',
        'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
        'prose-table:my-0 prose-th:border prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-td:border prose-td:px-3 prose-td:py-2',
        '[&_.contains-task-list]:list-none [&_.contains-task-list]:pl-0 [&_.task-list-item]:my-1 [&_.task-list-item]:flex [&_.task-list-item]:items-start [&_.task-list-item]:gap-2 [&_.task-list-item_input]:mt-1',
        '[&_.footnotes]:mt-10 [&_.footnotes]:border-t [&_.footnotes]:pt-4 [&_.footnotes]:text-sm',
        '[&_.math-display]:my-4 [&_.math-display]:overflow-x-auto [&_.math-inline_svg]:inline-block',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={markdownRemarkPlugins as ReactMarkdownProps['remarkPlugins']}
        rehypePlugins={markdownRehypePlugins as ReactMarkdownProps['rehypePlugins']}
        components={createMarkdownComponents(theme)}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
