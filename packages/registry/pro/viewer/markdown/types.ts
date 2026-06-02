export type MarkdownTheme = 'light' | 'dark'
export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution'

export type MarkdownNode = {
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
