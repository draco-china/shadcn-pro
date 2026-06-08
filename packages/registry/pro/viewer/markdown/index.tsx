'use client'

import { cva } from 'class-variance-authority'
import { CircleCheckIcon, InfoIcon, type LucideIcon, TriangleAlertIcon } from 'lucide-react'
import { isValidElement, useMemo } from 'react'
import type { Components, Options as ReactMarkdownOptions } from 'react-markdown'
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

type MarkdownNode = {
  type?: string
  lang?: string
  value?: string
  data?: Record<string, unknown>
  children?: MarkdownNode[]
}

const MARKDOWN_TABLE_ALIGN_CLASSES = {
  center: 'text-center',
  right: 'text-right',
  left: 'text-left',
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

const markdownRemarkPlugins: ReactMarkdownOptions['remarkPlugins'] = [
  remarkGfm,
  [remarkToc, { heading: 'contents|table[ -]of[ -]contents|toc', tight: true }],
  remarkBreaks,
  remarkMath,
  remarkMathCodeBlocks,
  remarkGitHubAlerts,
]

const markdownRehypePlugins: ReactMarkdownOptions['rehypePlugins'] = [
  rehypeRaw,
  [rehypeSanitize, sanitizeSchema],
  rehypeMathjax,
]

const alerts = {
  note: { label: 'Note', icon: InfoIcon },
  tip: { label: 'Tip', icon: CircleCheckIcon },
  important: { label: 'Important', icon: InfoIcon },
  warning: { label: 'Warning', icon: TriangleAlertIcon },
  caution: { label: 'Caution', icon: TriangleAlertIcon },
} satisfies Record<string, { label: string; icon: LucideIcon }>

const alertVariants = cva('', {
  variants: {
    element: {
      surface:
        'not-prose my-5 rounded-lg border px-4 py-3 text-sm text-foreground shadow-sm [&_p]:my-0 [&_p+p]:mt-2',
      title: 'mb-2 flex items-start gap-2 font-semibold',
    },
    variant: {
      note: '',
      tip: '',
      important: '',
      warning: '',
      caution: '',
    },
  },
  compoundVariants: [
    { element: 'surface', variant: 'note', class: 'border-blue-500/30 bg-blue-500/5' },
    { element: 'surface', variant: 'tip', class: 'border-green-500/30 bg-green-500/5' },
    { element: 'surface', variant: 'important', class: 'border-purple-500/30 bg-purple-500/5' },
    { element: 'surface', variant: 'warning', class: 'border-amber-500/35 bg-amber-500/10' },
    { element: 'surface', variant: 'caution', class: 'border-red-500/30 bg-red-500/5' },
    { element: 'title', variant: 'note', class: 'text-blue-600 dark:text-blue-400' },
    { element: 'title', variant: 'tip', class: 'text-green-600 dark:text-green-400' },
    { element: 'title', variant: 'important', class: 'text-purple-600 dark:text-purple-400' },
    { element: 'title', variant: 'warning', class: 'text-amber-700 dark:text-amber-400' },
    { element: 'title', variant: 'caution', class: 'text-red-600 dark:text-red-400' },
  ],
  defaultVariants: {
    variant: 'note',
  },
})

export function MarkdownViewer({
  content,
  theme = 'dark',
  className,
}: {
  content: string
  theme?: 'light' | 'dark'
  className?: string
}) {
  const components = useMemo<Components>(
    () => ({
      div: MarkdownDiv,
      ...markdownBlockElements,
      a: (props) => {
        const { className, children, ...elementProps } = withoutMarkdownNode(props)
        return (
          <a
            className={cn(
              'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
              className,
            )}
            rel="noreferrer"
            target="_blank"
            {...elementProps}
          >
            {children}
          </a>
        )
      },
      code: (props) => {
        const { className, children, ...elementProps } = withoutMarkdownNode(props)
        const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]

        if (lang) {
          return (
            <CodeViewer
              code={String(children).replace(/\n$/, '')}
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
            {...elementProps}
          >
            {children}
          </code>
        )
      },
      h1: (props) => {
        const { className, children, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h1
            id={slugify(getNodeText(children))}
            className={cn(
              'mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight first:mt-0 last:mb-0',
              className,
            )}
            {...elementProps}
          >
            {children}
          </h1>
        )
      },
      h2: (props) => {
        const { className, children, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h2
            id={slugify(getNodeText(children))}
            className={cn(
              'mt-10 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 last:mb-0',
              className,
            )}
            {...elementProps}
          >
            {children}
          </h2>
        )
      },
      h3: (props) => {
        const { className, children, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h3
            id={slugify(getNodeText(children))}
            className={cn(
              'mt-8 mb-3 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0',
              className,
            )}
            {...elementProps}
          >
            {children}
          </h3>
        )
      },
      h4: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h4
            className={cn(
              'mt-6 mb-2 scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 last:mb-0',
              className,
            )}
            {...elementProps}
          />
        )
      },
      h5: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h5
            className={cn('mt-5 mb-2 text-base font-semibold first:mt-0 last:mb-0', className)}
            {...elementProps}
          />
        )
      },
      h6: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <h6
            className={cn(
              'mt-5 mb-2 text-sm font-semibold text-muted-foreground first:mt-0 last:mb-0',
              className,
            )}
            {...elementProps}
          />
        )
      },
      kbd: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <kbd
            className={cn(
              'rounded border bg-muted px-1.5 py-0.5 font-mono text-[0.8em] font-medium text-muted-foreground shadow-sm',
              className,
            )}
            {...elementProps}
          />
        )
      },
      strong: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <strong className={cn('font-semibold text-foreground', className)} {...elementProps} />
        )
      },
      sup: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <sup className={cn('[&>a]:text-xs [&>a]:no-underline', className)} {...elementProps} />
        )
      },
      table: (props) => {
        const { children, ...elementProps } = withoutMarkdownNode(props)
        return (
          <div
            className={
              'not-prose my-6 w-full overflow-x-auto rounded-lg border border-border shadow-sm'
            }
          >
            <table
              className="w-full min-w-full border-separate border-spacing-0 text-sm"
              {...elementProps}
            >
              {children}
            </table>
          </div>
        )
      },
      tbody: (props) => {
        const { className, ...elementProps } = withoutMarkdownNode(props)
        return (
          <tbody className={cn('[&_tr:last-child>*]:border-b-0', className)} {...elementProps} />
        )
      },
      td: (props) => {
        const { className, align, ...elementProps } = withoutMarkdownNode(props)

        return (
          <td
            align={align}
            className={cn(
              'border-r border-b border-border px-4 py-2.5 align-top last:border-r-0',
              MARKDOWN_TABLE_ALIGN_CLASSES[align ?? 'left'],
              className,
            )}
            {...elementProps}
          />
        )
      },
      th: (props) => {
        const { className, align, ...elementProps } = withoutMarkdownNode(props)

        return (
          <th
            align={align}
            className={cn(
              'border-r border-b border-border bg-muted px-4 py-2.5 font-semibold align-top last:border-r-0',
              MARKDOWN_TABLE_ALIGN_CLASSES[align ?? 'left'],
              className,
            )}
            {...elementProps}
          />
        )
      },
    }),
    [theme],
  )

  if (!content.trim()) {
    return <div className={cn('text-sm text-muted-foreground', className)}>No markdown content</div>
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
        remarkPlugins={markdownRemarkPlugins}
        rehypePlugins={markdownRehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

function remarkMathCodeBlocks() {
  return (tree: MarkdownNode) => {
    walkMarkdownNode(tree, (node) => {
      if (node.type !== 'code' || node.lang !== 'math') return
      node.type = 'math'
      delete node.lang
    })
  }
}

function remarkGitHubAlerts() {
  return (tree: MarkdownNode) => {
    walkMarkdownNode(tree, (node) => {
      if (node.type !== 'blockquote') return

      const firstParagraph = node.children?.[0]
      const firstText = firstParagraph?.children?.[0]
      if (firstParagraph?.type !== 'paragraph' || firstText?.type !== 'text' || !firstText.value) {
        return
      }

      const match = firstText.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\s*\n?/i)
      if (!match) return

      const type = match[1].toLowerCase() as keyof typeof alerts
      if (!(type in alerts)) return

      firstText.value = firstText.value.slice(match[0].length).replace(/^\s+/, '')
      while (firstParagraph.children?.[0] && isEmptyAlertLeadNode(firstParagraph.children[0])) {
        firstParagraph.children.shift()
      }
      if (firstParagraph.children?.length === 0) {
        node.children?.shift()
      }
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
        children: [{ type: 'text', value: alerts[type].label }],
      })
    })
  }
}

function isEmptyAlertLeadNode(node: MarkdownNode) {
  return (node.type === 'text' && (node.value ?? '').trim().length === 0) || node.type === 'break'
}

function walkMarkdownNode(node: MarkdownNode, visitor: (node: MarkdownNode) => void) {
  visitor(node)
  if (!node.children) return
  node.children.forEach((child) => {
    walkMarkdownNode(child, visitor)
  })
}

function withoutMarkdownNode<TProps extends { node?: unknown }>(props: TProps) {
  const { node: _node, ...elementProps } = props
  return elementProps
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
  if (isValidElement<{ children?: unknown }>(children)) return getNodeText(children.props.children)
  return ''
}

const MarkdownDiv: NonNullable<Components['div']> = (props) => {
  const { className, children, ...elementProps } = withoutMarkdownNode(props)
  const classNames = String(className ?? '')

  if (!classNames.includes('markdown-alert')) {
    return (
      <div className={className} {...elementProps}>
        {children}
      </div>
    )
  }

  const alertType =
    (Object.keys(alerts) as Array<keyof typeof alerts>).find(
      (type) =>
        classNames.includes(`markdown-alert-${type}`) ||
        classNames.includes(`markdown-alert-title-${type}`),
    ) ?? 'note'

  if (classNames.includes('markdown-alert-title')) {
    const Icon = alerts[alertType].icon

    return (
      <div className={alertVariants({ element: 'title', variant: alertType })} {...elementProps}>
        <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>{children}</span>
      </div>
    )
  }

  return (
    <div className={alertVariants({ element: 'surface', variant: alertType })} {...elementProps}>
      {children}
    </div>
  )
}

const markdownBlockElements: Pick<
  Components,
  'blockquote' | 'details' | 'hr' | 'img' | 'li' | 'ol' | 'p' | 'pre' | 'summary' | 'ul'
> = {
  blockquote: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return (
      <blockquote
        className={cn(
          'my-6 border-l-2 border-primary/60 pl-5 text-muted-foreground italic [&>p]:my-0',
          className,
        )}
        {...elementProps}
      />
    )
  },
  details: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return (
      <details
        className={cn('my-5 rounded-lg border bg-muted/25 px-4 py-3', className)}
        {...elementProps}
      />
    )
  },
  hr: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <hr className={cn('my-8 border-border', className)} {...elementProps} />
  },
  img: (props) => {
    const { className, alt, ...elementProps } = withoutMarkdownNode(props)
    return (
      <img
        className={cn('my-6 max-w-full rounded-lg border shadow-sm', className)}
        alt={alt ?? ''}
        {...elementProps}
      />
    )
  },
  li: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <li className={cn('mt-2 pl-1', className)} {...elementProps} />
  },
  ol: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <ol className={cn('my-5 ml-6 list-decimal space-y-1', className)} {...elementProps} />
  },
  p: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <p className={cn('my-5 leading-7 first:mt-0 last:mb-0', className)} {...elementProps} />
  },
  pre: ({ children }) => <>{children}</>,
  summary: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return (
      <summary
        className={cn('cursor-pointer font-medium text-foreground', className)}
        {...elementProps}
      />
    )
  },
  ul: (props) => {
    const { className, ...elementProps } = withoutMarkdownNode(props)
    return <ul className={cn('my-5 ml-6 list-disc space-y-1', className)} {...elementProps} />
  },
}
