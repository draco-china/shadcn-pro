'use client'

import type { IframeHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { htmlViewerFrameClassName } from './classes'

export const DEFAULT_HTML_VIEWER_SANDBOX = 'allow-scripts'

export interface HtmlViewerProps {
  content: string
  sandbox?: IframeHTMLAttributes<HTMLIFrameElement>['sandbox']
  title?: string
  className?: string
}

export function HtmlViewer({
  content,
  sandbox = DEFAULT_HTML_VIEWER_SANDBOX,
  title = 'HTML preview',
  className,
}: HtmlViewerProps) {
  return (
    <iframe
      srcDoc={content}
      sandbox={sandbox}
      className={cn(htmlViewerFrameClassName, className)}
      title={title}
    />
  )
}
