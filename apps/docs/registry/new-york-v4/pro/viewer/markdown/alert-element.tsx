import type { Components } from 'react-markdown'
import { isMarkdownAlert, isMarkdownAlertTitle, MarkdownAlert, MarkdownAlertTitle } from './alert'
import { withoutMarkdownNode } from './utils'

export const markdownAlertElement: Pick<Components, 'div'> = {
  div: (props) => {
    const { className, children, ...elementProps } = withoutMarkdownNode(props)
    const classNames = String(className ?? '')

    if (isMarkdownAlertTitle(classNames)) {
      return (
        <MarkdownAlertTitle className={classNames} {...elementProps}>
          {children}
        </MarkdownAlertTitle>
      )
    }

    if (isMarkdownAlert(classNames)) {
      return (
        <MarkdownAlert className={classNames} {...elementProps}>
          {children}
        </MarkdownAlert>
      )
    }

    return (
      <div className={className} {...elementProps}>
        {children}
      </div>
    )
  },
}
