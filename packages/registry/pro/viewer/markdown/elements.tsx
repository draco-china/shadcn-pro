import type { Components } from 'react-markdown'
import { markdownAlertElement } from './alert-element'
import { markdownBlockElements } from './block-elements'
import { markdownInlineElements } from './inline-elements'

export const markdownElements: Pick<
  Components,
  | keyof typeof markdownAlertElement
  | keyof typeof markdownBlockElements
  | keyof typeof markdownInlineElements
> = {
  ...markdownAlertElement,
  ...markdownBlockElements,
  ...markdownInlineElements,
}
