import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function HtmlViewer({
  content,
  sandbox = 'allow-scripts',
  className,
  title = 'HTML preview',
  ...props
}: Omit<ComponentProps<'iframe'>, 'srcDoc'> & {
  content: string
}) {
  return (
    <iframe
      srcDoc={content}
      sandbox={sandbox}
      className={cn('size-full border-0 bg-background', className)}
      title={title}
      {...props}
    />
  )
}
