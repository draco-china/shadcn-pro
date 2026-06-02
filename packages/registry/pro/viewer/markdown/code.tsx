import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import { CodeViewer } from '../code'
import { markdownCodeBlockClassName, markdownInlineCodeClassName } from './classes'
import type { MarkdownTheme } from './types'
import { withoutMarkdownNode } from './utils'

type CodeComponent = NonNullable<Components['code']>

export function createMarkdownCodeComponent(theme: MarkdownTheme): CodeComponent {
  return (props) => {
    const { className, children, ...elementProps } = withoutMarkdownNode(props)
    const lang = /language-([\w-]+)/.exec(className ?? '')?.[1]
    const code = String(children).replace(/\n$/, '')

    if (lang) {
      return (
        <CodeViewer
          code={code}
          lang={lang}
          theme={theme}
          className={markdownCodeBlockClassName}
          title={lang}
        />
      )
    }

    return (
      <code className={cn(markdownInlineCodeClassName, className)} {...elementProps}>
        {children}
      </code>
    )
  }
}
