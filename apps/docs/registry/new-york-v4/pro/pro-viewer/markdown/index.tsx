'use client'

import { CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import rehypeMathjax from 'rehype-mathjax/svg'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import { cn } from '@/lib/utils'
import { CodeViewer } from '../code'

type MarkdownTheme = 'light' | 'dark'
type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution'
type CodeComponent = NonNullable<Components['code']>
type ReactMarkdownProps = ComponentProps<typeof ReactMarkdown>

type MarkdownNode = {
  type?: string
  lang?: string
  value?: string
  data?: Record<string, unknown>
  children?: MarkdownNode[]
}

export interface MarkdownViewerProps {
  content: string
  theme?: MarkdownTheme
  className?: string
  emptyText?: string
}

const ALERTS = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
} as const

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'details', 'summary', 'kbd', 'sub', 'sup'],
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'className', 'target', 'rel'],
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    div: [...(defaultSchema.attributes?.div ?? []), 'className', 'data-alert'],
    input: [...(defaultSchema.attributes?.input ?? []), 'type', 'checked', 'disabled'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className', 'aria-hidden'],
    svg: [
      ...(defaultSchema.attributes?.svg ?? []),
      'className',
      'height',
      'role',
      'style',
      'viewBox',
      'width',
      'xmlns',
    ],
    path: [...(defaultSchema.attributes?.path ?? []), 'd', 'fill', 'stroke'],
    g: [...(defaultSchema.attributes?.g ?? []), 'fill', 'stroke', 'transform'],
    line: [
      ...(defaultSchema.attributes?.line ?? []),
      'stroke',
      'strokeWidth',
      'x1',
      'x2',
      'y1',
      'y2',
    ],
    rect: [
      ...(defaultSchema.attributes?.rect ?? []),
      'fill',
      'height',
      'rx',
      'ry',
      'stroke',
      'width',
      'x',
      'y',
    ],
    td: [...(defaultSchema.attributes?.td ?? []), 'align'],
    th: [...(defaultSchema.attributes?.th ?? []), 'align'],
  },
}

const markdownRemarkPlugins = [
  remarkGfm,
  [remarkToc, { heading: 'contents|table[ -]of[ -]contents|toc', tight: true }],
  remarkBreaks,
  remarkMath,
  remarkMathCodeBlocks,
  remarkGitHubAlerts,
]

const markdownRehypePlugins = [rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeMathjax]

export function MarkdownViewer({
  content,
  theme = 'dark',
  className,
  emptyText = 'No markdown content',
}: MarkdownViewerProps) {
  if (!content.trim()) {
    return <div className={cn('text-sm text-muted-foreground', className)}>{emptyText}</div>
  }

  return (
    <div
      className={cn(
        'max-w-none text-foreground',
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

function createMarkdownComponents(theme: MarkdownTheme): Components {
  return {
    a: ({ className, children, node: _node, ...props }) => (
      <a
        className={cn(
          'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
          className,
        )}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ className, node: _node, ...props }) => (
      <blockquote
        className={cn(
          'my-6 border-l-2 border-primary/60 pl-5 text-muted-foreground italic [&>p]:my-0',
          className,
        )}
        {...props}
      />
    ),
    code: createCodeComponent(theme),
    details: ({ className, node: _node, ...props }) => (
      <details
        className={cn('my-5 rounded-lg border bg-muted/25 px-4 py-3', className)}
        {...props}
      />
    ),
    div: ({ className, children, node: _node, ...props }) => {
      const classNames = String(className ?? '')
      if (isMarkdownAlertTitle(classNames)) {
        return (
          <MarkdownAlertTitle className={classNames} {...props}>
            {children}
          </MarkdownAlertTitle>
        )
      }
      if (isMarkdownAlert(classNames)) {
        return (
          <MarkdownAlert className={classNames} {...props}>
            {children}
          </MarkdownAlert>
        )
      }
      return (
        <div className={className} {...props}>
          {children}
        </div>
      )
    },
    h1: MarkdownH1,
    h2: MarkdownH2,
    h3: MarkdownH3,
    h4: MarkdownH4,
    h5: MarkdownH5,
    h6: MarkdownH6,
    hr: ({ className, node: _node, ...props }) => (
      <hr className={cn('my-8 border-border', className)} {...props} />
    ),
    img: ({ className, alt, node: _node, ...props }) => (
      <img
        className={cn('my-6 max-w-full rounded-lg border shadow-sm', className)}
        alt={alt ?? ''}
        {...props}
      />
    ),
    kbd: ({ className, node: _node, ...props }) => (
      <kbd
        className={cn(
          'rounded border bg-muted px-1.5 py-0.5 font-mono text-[0.8em] font-medium text-muted-foreground shadow-sm',
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, node: _node, ...props }) => (
      <li className={cn('mt-2 pl-1', className)} {...props} />
    ),
    ol: ({ className, node: _node, ...props }) => (
      <ol className={cn('my-5 ml-6 list-decimal space-y-1', className)} {...props} />
    ),
    p: ({ className, node: _node, ...props }) => (
      <p className={cn('my-5 leading-7 first:mt-0 last:mb-0', className)} {...props} />
    ),
    pre: ({ children }) => <>{children}</>,
    strong: ({ className, node: _node, ...props }) => (
      <strong className={cn('font-semibold text-foreground', className)} {...props} />
    ),
    summary: ({ className, node: _node, ...props }) => (
      <summary className={cn('cursor-pointer font-medium text-foreground', className)} {...props} />
    ),
    sup: ({ className, node: _node, ...props }) => (
      <sup className={cn('[&>a]:text-xs [&>a]:no-underline', className)} {...props} />
    ),
    table: MarkdownTable,
    tbody: MarkdownTableBody,
    td: MarkdownTableCell,
    th: MarkdownTableHead,
    ul: ({ className, node: _node, ...props }) => (
      <ul className={cn('my-5 ml-6 list-disc space-y-1', className)} {...props} />
    ),
  }
}

function createCodeComponent(theme: MarkdownTheme): CodeComponent {
  return ({ className, children, node: _node, ...props }) => {
    const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]
    const code = String(children).replace(/\n$/, '')

    if (lang) {
      return (
        <CodeViewer
          code={code}
          lang={lang}
          theme={theme}
          className="not-prose my-5 shadow-sm"
          title={lang}
        />
      )
    }

    return (
      <code
        className={cn(
          'rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium text-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </code>
    )
  }
}

function isMarkdownAlert(classNames: string) {
  return classNames.includes('markdown-alert') && !isMarkdownAlertTitle(classNames)
}

function isMarkdownAlertTitle(classNames: string) {
  return classNames.includes('markdown-alert-title')
}

function MarkdownAlert({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const type = getAlertType(String(className ?? ''))

  return (
    <div
      className={cn(
        'not-prose my-5 rounded-lg border px-4 py-3 text-sm shadow-sm [&_p]:my-0 [&_p+p]:mt-2',
        alertSurfaceClass(type),
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function MarkdownAlertTitle({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const type = getAlertType(String(className ?? ''))

  return (
    <div
      className={cn('mb-2 flex items-start gap-2 font-semibold', alertTextClass(type))}
      {...props}
    >
      <MarkdownAlertIcon type={type} />
      <span>{children}</span>
    </div>
  )
}

function getAlertType(classNames: string): AlertType {
  if (classNames.includes('markdown-alert-tip') || classNames.includes('markdown-alert-title-tip')) {
    return 'tip'
  }
  if (
    classNames.includes('markdown-alert-important') ||
    classNames.includes('markdown-alert-title-important')
  ) {
    return 'important'
  }
  if (
    classNames.includes('markdown-alert-warning') ||
    classNames.includes('markdown-alert-title-warning')
  ) {
    return 'warning'
  }
  if (
    classNames.includes('markdown-alert-caution') ||
    classNames.includes('markdown-alert-title-caution')
  ) {
    return 'caution'
  }
  return 'note'
}

function MarkdownAlertIcon({ type }: { type: AlertType }) {
  if (type === 'tip') {
    return <CircleCheckIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
  }
  if (type === 'warning' || type === 'caution') {
    return <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
  }
  return <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
}

function alertSurfaceClass(type: AlertType) {
  if (type === 'tip') return 'border-green-500/30 bg-green-500/5 text-foreground'
  if (type === 'important') return 'border-purple-500/30 bg-purple-500/5 text-foreground'
  if (type === 'warning') return 'border-amber-500/35 bg-amber-500/10 text-foreground'
  if (type === 'caution') return 'border-red-500/30 bg-red-500/5 text-foreground'
  return 'border-blue-500/30 bg-blue-500/5 text-foreground'
}

function alertTextClass(type: AlertType) {
  if (type === 'tip') return 'text-green-600 dark:text-green-400'
  if (type === 'important') return 'text-purple-600 dark:text-purple-400'
  if (type === 'warning') return 'text-amber-700 dark:text-amber-400'
  if (type === 'caution') return 'text-red-600 dark:text-red-400'
  return 'text-blue-600 dark:text-blue-400'
}

const MarkdownH1: NonNullable<Components['h1']> = ({
  className,
  children,
  node: _node,
  ...props
}) => (
  <h1
    id={slugify(getNodeText(children))}
    className={cn(
      'mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight first:mt-0 last:mb-0',
      className,
    )}
    {...props}
  >
    {children}
  </h1>
)

const MarkdownH2: NonNullable<Components['h2']> = ({
  className,
  children,
  node: _node,
  ...props
}) => (
  <h2
    id={slugify(getNodeText(children))}
    className={cn(
      'mt-10 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 last:mb-0',
      className,
    )}
    {...props}
  >
    {children}
  </h2>
)

const MarkdownH3: NonNullable<Components['h3']> = ({
  className,
  children,
  node: _node,
  ...props
}) => (
  <h3
    id={slugify(getNodeText(children))}
    className={cn(
      'mt-8 mb-3 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0',
      className,
    )}
    {...props}
  >
    {children}
  </h3>
)

const MarkdownH4: NonNullable<Components['h4']> = ({ className, node: _node, ...props }) => (
  <h4
    className={cn(
      'mt-6 mb-2 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 last:mb-0',
      className,
    )}
    {...props}
  />
)

const MarkdownH5: NonNullable<Components['h5']> = ({ className, node: _node, ...props }) => (
  <h5
    className={cn('mt-5 mb-2 text-base font-semibold first:mt-0 last:mb-0', className)}
    {...props}
  />
)

const MarkdownH6: NonNullable<Components['h6']> = ({ className, node: _node, ...props }) => (
  <h6
    className={cn(
      'mt-5 mb-2 text-sm font-semibold text-muted-foreground first:mt-0 last:mb-0',
      className,
    )}
    {...props}
  />
)

const MarkdownTable: NonNullable<Components['table']> = ({ children, node: _node, ...props }) => (
  <div className="not-prose my-6 w-full overflow-x-auto rounded-lg border border-border shadow-sm">
    <table className="w-full min-w-full border-separate border-spacing-0 text-sm" {...props}>
      {children}
    </table>
  </div>
)

const MarkdownTableBody: NonNullable<Components['tbody']> = ({
  className,
  node: _node,
  ...props
}) => <tbody className={cn('[&_tr:last-child>*]:border-b-0', className)} {...props} />

const MarkdownTableCell: NonNullable<Components['td']> = ({
  className,
  align,
  node: _node,
  ...props
}) => (
  <td
    align={align}
    className={cn(
      'border-r border-b border-border px-4 py-2.5 align-top last:border-r-0',
      getTableAlignClass(align),
      className,
    )}
    {...props}
  />
)

const MarkdownTableHead: NonNullable<Components['th']> = ({
  className,
  align,
  node: _node,
  ...props
}) => (
  <th
    align={align}
    className={cn(
      'border-r border-b border-border bg-muted px-4 py-2.5 font-semibold align-top last:border-r-0',
      getTableAlignClass(align),
      className,
    )}
    {...props}
  />
)

function remarkGitHubAlerts() {
  return (tree: MarkdownNode) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote') return

      const firstParagraph = node.children?.[0]
      const firstText = firstParagraph?.children?.[0]
      if (firstParagraph?.type !== 'paragraph' || firstText?.type !== 'text' || !firstText.value) {
        return
      }

      const match = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\s*\n?/i)
      if (!match) return

      const type = match[1].toLowerCase() as keyof typeof ALERTS
      firstText.value = firstText.value.slice(match[0].length).replace(/^\s+/, '')
      node.data = {
        hName: 'div',
        hProperties: { className: `markdown-alert markdown-alert-${type}`, dataAlert: type },
      }
      node.children?.unshift({
        type: 'paragraph',
        data: {
          hName: 'div',
          hProperties: { className: `markdown-alert-title markdown-alert-title-${type}` },
        },
        children: [{ type: 'text', value: ALERTS[type] }],
      })
    })
  }
}

function remarkMathCodeBlocks() {
  return (tree: MarkdownNode) => {
    walk(tree, (node) => {
      if (node.type === 'code' && node.lang === 'math') {
        node.type = 'math'
        delete node.lang
      }
    })
  }
}

function walk(node: MarkdownNode, visitor: (node: MarkdownNode) => void) {
  visitor(node)
  if (!node.children) return
  for (const child of node.children) walk(child, visitor)
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
}

function getNodeText(children: unknown): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(getNodeText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return getNodeText((children as { props?: { children?: unknown } }).props?.children)
  }
  return ''
}

function getTableAlignClass(align?: string) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}
