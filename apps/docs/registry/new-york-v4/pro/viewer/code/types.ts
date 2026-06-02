import type { Ref, UIEventHandler } from 'react'
import type { ViewerTheme } from '../shared/syntax'

export interface CodeViewerProps {
  code: string
  lang?: string
  theme?: ViewerTheme
  showLineNumbers?: boolean
  showHeader?: boolean
  surface?: 'code' | 'embedded'
  className?: string
  title?: string
  emptyText?: string
  scrollRef?: Ref<HTMLDivElement>
  onScroll?: UIEventHandler<HTMLDivElement>
}
