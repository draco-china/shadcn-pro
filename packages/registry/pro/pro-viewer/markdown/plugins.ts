import rehypeMathjax from 'rehype-mathjax/svg'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

type MarkdownNode = {
  type?: string
  lang?: string
  value?: string
  data?: Record<string, unknown>
  children?: MarkdownNode[]
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

function walk(node: MarkdownNode, visitor: (node: MarkdownNode) => void) {
  visitor(node)
  if (!node.children) return
  for (const child of node.children) walk(child, visitor)
}

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
        data: { hName: 'div', hProperties: { className: 'markdown-alert-title' } },
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

export const markdownRemarkPlugins = [
  remarkGfm,
  remarkBreaks,
  remarkMath,
  remarkMathCodeBlocks,
  remarkGitHubAlerts,
]

export const markdownRehypePlugins = [rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeMathjax]

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
  if (children && typeof children === 'object' && 'props' in children) {
    return getNodeText((children as { props?: { children?: unknown } }).props?.children)
  }
  return ''
}

export function getTableAlignClass(align?: string) {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}
