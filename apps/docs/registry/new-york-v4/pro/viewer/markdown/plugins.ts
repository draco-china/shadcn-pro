/** Alert labels recognized by the GitHub alert transformer. */
export const markdownAlertLabels = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
} as const

/** Default ESM CDN used by the Markdown parser worker. */
export const DEFAULT_MARKDOWN_CDN = 'https://esm.sh'

export interface MarkdownNode {
  type: string
  value?: string
  lang?: string
  tagName?: string
  properties?: Record<string, unknown>
  data?: Record<string, unknown>
  children?: MarkdownNode[]
}

export interface MarkdownRoot extends MarkdownNode {
  type: 'root'
  children: MarkdownNode[]
}

export interface MarkdownWorkerRequest {
  id: number
  content: string
  cdnBaseUrl: string
}

export type MarkdownWorkerResponse =
  | { id: number; tree: MarkdownRoot }
  | { id: number; error: string }
