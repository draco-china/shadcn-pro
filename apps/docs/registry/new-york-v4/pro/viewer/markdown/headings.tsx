import type { Components } from 'react-markdown'
import { cn } from '@/lib/utils'
import {
  markdownH1ClassName,
  markdownH2ClassName,
  markdownH3ClassName,
  markdownH4ClassName,
  markdownH5ClassName,
  markdownH6ClassName,
} from './classes'
import { getNodeText, slugify, withoutMarkdownNode } from './utils'

export const MarkdownH1: NonNullable<Components['h1']> = (props) => {
  const { className, children, ...elementProps } = withoutMarkdownNode(props)
  return (
    <h1
      id={slugify(getNodeText(children))}
      className={cn(markdownH1ClassName, className)}
      {...elementProps}
    >
      {children}
    </h1>
  )
}

export const MarkdownH2: NonNullable<Components['h2']> = (props) => {
  const { className, children, ...elementProps } = withoutMarkdownNode(props)
  return (
    <h2
      id={slugify(getNodeText(children))}
      className={cn(markdownH2ClassName, className)}
      {...elementProps}
    >
      {children}
    </h2>
  )
}

export const MarkdownH3: NonNullable<Components['h3']> = (props) => {
  const { className, children, ...elementProps } = withoutMarkdownNode(props)
  return (
    <h3
      id={slugify(getNodeText(children))}
      className={cn(markdownH3ClassName, className)}
      {...elementProps}
    >
      {children}
    </h3>
  )
}

export const MarkdownH4: NonNullable<Components['h4']> = (props) => {
  const { className, ...elementProps } = withoutMarkdownNode(props)
  return <h4 className={cn(markdownH4ClassName, className)} {...elementProps} />
}

export const MarkdownH5: NonNullable<Components['h5']> = (props) => {
  const { className, ...elementProps } = withoutMarkdownNode(props)
  return <h5 className={cn(markdownH5ClassName, className)} {...elementProps} />
}

export const MarkdownH6: NonNullable<Components['h6']> = (props) => {
  const { className, ...elementProps } = withoutMarkdownNode(props)
  return <h6 className={cn(markdownH6ClassName, className)} {...elementProps} />
}
