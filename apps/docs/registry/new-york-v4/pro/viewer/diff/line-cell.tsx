import {
  diffEmptyLineClassName,
  diffEmptyLineNumberClassName,
  diffEmptyRowClassName,
  diffHighlightedLineClassName,
  diffLineNumberClassName,
  diffPlainLineClassName,
} from './classes'
import type { DiffLine } from './utils'

export const diffRowBackground: Record<DiffLine['type'], string> = {
  added: 'bg-primary/10',
  removed: 'bg-destructive/10',
  unchanged: '',
}

export function LineNo({ value }: { value?: number }) {
  return <td className={diffLineNumberClassName}>{value ?? ''}</td>
}

export function HighlightedLine({
  content,
  htmlMap,
}: {
  content: string
  htmlMap: Map<string, string>
}) {
  const html = htmlMap.get(content)
  if (!html) {
    return <td className={diffPlainLineClassName}>{content || ' '}</td>
  }

  return (
    <td
      className={diffHighlightedLineClassName}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped token content from shiki
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function EmptySplitLine() {
  return (
    <tr className={diffEmptyRowClassName}>
      <td className={diffEmptyLineNumberClassName} />
      <td className={diffEmptyLineClassName}>.</td>
    </tr>
  )
}
