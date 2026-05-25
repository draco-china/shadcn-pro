'use client'

import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import { CodeViewer } from '../code'
import type { ViewerTheme } from '../code/syntax'
import { getNodeText, getTableAlignClass, slugify } from './plugins'

export function createMarkdownComponents(theme: ViewerTheme): Components {
  return {
    a: ({ className, children, node: _node, ...props }) => (
      <a className={cn('break-words', className)} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    ),
    code: ({ className, children, node: _node, ...props }) => {
      const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]
      const code = String(children).replace(/\n$/, '')

      if (lang) {
        return (
          <CodeViewer
            code={code}
            lang={lang}
            theme={theme}
            showHeader={false}
            showLineNumbers={false}
            className="not-prose my-4"
          />
        )
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    div: ({ className, children, node: _node, ...props }) => {
      const classNames = String(className ?? '')
      if (classNames.includes('markdown-alert-title')) {
        return (
          <div className="mb-2 font-semibold text-foreground" {...props}>
            {children}
          </div>
        )
      }
      if (classNames.includes('markdown-alert')) {
        return (
          <div
            className={cn(
              'not-prose markdown-alert my-4 rounded-md border-l-4 bg-muted/40 px-4 py-3 text-sm',
              classNames.includes('markdown-alert-note') && 'border-l-blue-500',
              classNames.includes('markdown-alert-tip') && 'border-l-green-500',
              classNames.includes('markdown-alert-important') && 'border-l-purple-500',
              classNames.includes('markdown-alert-warning') && 'border-l-yellow-500',
              classNames.includes('markdown-alert-caution') && 'border-l-red-500',
            )}
            {...props}
          >
            {children}
          </div>
        )
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      )
    },
    h1: ({ children, node: _node, ...props }) => (
      <h1 id={slugify(getNodeText(children))} {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, node: _node, ...props }) => (
      <h2 id={slugify(getNodeText(children))} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, node: _node, ...props }) => (
      <h3 id={slugify(getNodeText(children))} {...props}>
        {children}
      </h3>
    ),
    img: ({ className, alt, node: _node, ...props }) => (
      <img className={cn('max-w-full', className)} alt={alt ?? ''} {...props} />
    ),
    pre: ({ children }) => <>{children}</>,
    table: ({ children, node: _node, ...props }) => (
      <div className="not-prose my-6 w-full overflow-x-auto rounded-md border border-border">
        <table
          className="w-full min-w-full border-separate border-spacing-0 text-sm [&_tbody_tr:last-child>*]:border-b-0 [&_tr>*:last-child]:border-r-0"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ className, align, node: _node, ...props }) => (
      <th
        align={align}
        className={cn(
          'border-r border-b border-border bg-muted px-3 py-2 font-semibold align-top',
          getTableAlignClass(align),
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, align, node: _node, ...props }) => (
      <td
        align={align}
        className={cn(
          'border-r border-b border-border px-3 py-2 align-top',
          getTableAlignClass(align),
          className,
        )}
        {...props}
      />
    ),
  }
}
