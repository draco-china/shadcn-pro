'use client'

import type * as React from 'react'
import { cn } from '@/lib/utils'

export const DEFAULT_HTML_VIEWER_SANDBOX = 'allow-scripts'

export interface HtmlViewerProps {
  content: string
  sandbox?: React.IframeHTMLAttributes<HTMLIFrameElement>['sandbox']
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
      className={cn('size-full border-0 bg-background', className)}
      title={title}
    />
  )
}
