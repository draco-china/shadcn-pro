import {
  type MarkdownNode,
  type MarkdownRoot,
  type MarkdownWorkerRequest,
  type MarkdownWorkerResponse,
  markdownAlertLabels,
} from './plugins'

const CDN_MODULES = {
  unified: 'unified@11.0.5',
  remarkParse: 'remark-parse@11.0.0',
  remarkGfm: 'remark-gfm@4.0.1',
  remarkToc: 'remark-toc@9.0.0',
  remarkBreaks: 'remark-breaks@4.0.0',
  remarkMath: 'remark-math@6.0.0',
  remarkRehype: 'remark-rehype@11.1.2',
  rehypeRaw: 'rehype-raw@7.0.0',
  rehypeSanitize: 'rehype-sanitize@6.0.0',
  rehypeMathjax: 'rehype-mathjax@7.1.0/svg',
} as const

interface Processor {
  use(plugin: unknown, options?: unknown): Processor
  parse(content: string): MarkdownNode
  run(tree: MarkdownNode): Promise<MarkdownRoot>
}

interface WorkerScope {
  onmessage: ((event: MessageEvent<MarkdownWorkerRequest>) => void) | null
  postMessage(message: MarkdownWorkerResponse): void
}

const workerScope = self as unknown as WorkerScope
const processors = new Map<string, Promise<Processor>>()

workerScope.onmessage = async ({ data }) => {
  try {
    const processor = await getProcessor(data.cdnBaseUrl)
    let tree: MarkdownRoot
    try {
      tree = await processor.run(processor.parse(normalizeMathCodeBlocks(data.content)))
    } catch (error) {
      throw new Error(`Markdown pipeline: ${getErrorMessage(error)}`)
    }
    workerScope.postMessage({ id: data.id, tree })
  } catch (error) {
    workerScope.postMessage({
      id: data.id,
      error: getErrorMessage(error),
    })
  }
}

function getProcessor(cdnBaseUrl: string) {
  const baseUrl = cdnBaseUrl.replace(/\/+$/, '')
  const cached = processors.get(baseUrl)
  if (cached) return cached

  const processor = createProcessor(baseUrl)
  processors.set(baseUrl, processor)
  return processor
}

async function createProcessor(baseUrl: string): Promise<Processor> {
  const moduleNames = Object.values(CDN_MODULES)
  const modules = await Promise.all(
    moduleNames.map(async (moduleName) => {
      try {
        return await import(
          /* webpackIgnore: true */ `${baseUrl}/${moduleName}?bundle&target=denonext`
        )
      } catch (error) {
        throw new Error(`${moduleName}: ${getErrorMessage(error)}`)
      }
    }),
  )
  const [
    unifiedModule,
    remarkParseModule,
    remarkGfmModule,
    remarkTocModule,
    remarkBreaksModule,
    remarkMathModule,
    remarkRehypeModule,
    rehypeRawModule,
    rehypeSanitizeModule,
    rehypeMathjaxModule,
  ] = modules as Array<Record<string, unknown>>

  const unified = unifiedModule.unified as () => Processor
  const defaultSchema = rehypeSanitizeModule.defaultSchema as SanitizeSchema

  return unified()
    .use(remarkParseModule.default)
    .use(remarkGfmModule.default)
    .use(remarkTocModule.default, {
      heading: 'contents|table[ -]of[ -]contents|toc',
      tight: true,
    })
    .use(remarkBreaksModule.default)
    .use(remarkMathModule.default)
    .use(remarkGitHubAlerts)
    .use(remarkRehypeModule.default, { allowDangerousHtml: true })
    .use(rehypeRawModule.default)
    .use(rehypeSanitizeModule.default, createSanitizeSchema(defaultSchema))
    .use(rehypeMathjaxModule.default)
}

interface SanitizeSchema {
  tagNames?: string[]
  attributes?: Record<string, unknown[]>
  [key: string]: unknown
}

function createSanitizeSchema(defaultSchema: SanitizeSchema): SanitizeSchema {
  return {
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

      const type = match[1].toLowerCase() as keyof typeof markdownAlertLabels
      if (!(type in markdownAlertLabels)) return

      firstText.value = firstText.value.slice(match[0].length).replace(/^\s+/, '')
      while (firstParagraph.children?.[0] && isEmptyAlertLeadNode(firstParagraph.children[0])) {
        firstParagraph.children.shift()
      }
      if (firstParagraph.children?.length === 0) node.children?.shift()
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
        children: [{ type: 'text', value: markdownAlertLabels[type] }],
      })
    })
  }
}

function normalizeMathCodeBlocks(content: string) {
  return content.replace(/```math\s*\n([\s\S]*?)\n```/g, (_match, formula: string) => {
    return `$$\n${formula}\n$$`
  })
}

function isEmptyAlertLeadNode(node: MarkdownNode) {
  return (node.type === 'text' && (node.value ?? '').trim().length === 0) || node.type === 'break'
}

function walkMarkdownNode(node: MarkdownNode, visitor: (node: MarkdownNode) => void) {
  visitor(node)
  if (!node.children) return
  for (const child of node.children) walkMarkdownNode(child, visitor)
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to parse Markdown'
}
