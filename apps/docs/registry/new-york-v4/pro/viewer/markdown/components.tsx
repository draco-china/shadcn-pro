import type { Components } from 'react-markdown'
import { createMarkdownCodeComponent } from './code'
import { markdownElements } from './elements'
import { MarkdownH1, MarkdownH2, MarkdownH3, MarkdownH4, MarkdownH5, MarkdownH6 } from './headings'
import { MarkdownTable, MarkdownTableBody, MarkdownTableCell, MarkdownTableHead } from './table'
import type { MarkdownTheme } from './types'

export function createMarkdownComponents(theme: MarkdownTheme): Components {
  return {
    ...markdownElements,
    code: createMarkdownCodeComponent(theme),
    h1: MarkdownH1,
    h2: MarkdownH2,
    h3: MarkdownH3,
    h4: MarkdownH4,
    h5: MarkdownH5,
    h6: MarkdownH6,
    table: MarkdownTable,
    tbody: MarkdownTableBody,
    td: MarkdownTableCell,
    th: MarkdownTableHead,
  }
}
