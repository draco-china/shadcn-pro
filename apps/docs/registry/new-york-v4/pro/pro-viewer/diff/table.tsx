'use client'

import { cn } from '@/lib/utils'
import type { DiffLine } from './utils'

const DIFF_BG: Record<DiffLine['type'], string> = {
  added: 'bg-green-500/10',
  removed: 'bg-red-500/10',
  unchanged: '',
}

function LineNo({ value }: { value?: number }) {
  return (
    <td className="w-10 select-none border-r border-white/5 py-0 pl-2 pr-2 text-right font-mono text-xs text-white/25">
      {value ?? ''}
    </td>
  )
}

function HighlightedLine({ content, htmlMap }: { content: string; htmlMap: Map<string, string> }) {
  const html = htmlMap.get(content)
  if (!html) {
    return (
      <td className="py-0 pl-2 pr-4 whitespace-pre font-mono text-xs text-white/85">
        {content || ' '}
      </td>
    )
  }

  return (
    <td
      className="py-0 pl-2 pr-4 whitespace-pre font-mono text-xs"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped token content from shiki
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function EmptySplitLine() {
  return (
    <tr className="bg-black/20 leading-6">
      <td className="w-10" />
      <td className="py-0 pr-4 font-mono text-xs text-white/10">.</td>
    </tr>
  )
}

export function UnifiedDiffTable({
  lines,
  htmlMap,
}: {
  lines: DiffLine[]
  htmlMap: Map<string, string>
}) {
  return (
    <table className="w-full border-collapse">
      <tbody>
        {lines.map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: diff rows are derived from immutable line order
          <tr key={`${line.type}-${index}`} className={cn('leading-6', DIFF_BG[line.type])}>
            <LineNo value={line.oldLineNo} />
            <LineNo value={line.newLineNo} />
            <td className="w-4 select-none py-0 pl-2 pr-1 font-mono text-xs text-white/25">
              {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
            </td>
            <HighlightedLine content={line.content} htmlMap={htmlMap} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function SplitDiffPane({
  title,
  lines,
  side,
  htmlMap,
}: {
  title: string
  lines: (DiffLine | null)[]
  side: 'old' | 'new'
  htmlMap: Map<string, string>
}) {
  return (
    <div>
      <div className="border-b border-white/10 px-4 py-1.5 text-xs text-white/40">{title}</div>
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, index) =>
            line ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: diff rows are derived from immutable line order
              <tr key={`${side}-${index}`} className={cn('leading-6', DIFF_BG[line.type])}>
                <LineNo value={side === 'old' ? line.oldLineNo : line.newLineNo} />
                <HighlightedLine content={line.content} htmlMap={htmlMap} />
              </tr>
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: diff rows are derived from immutable line order
              <EmptySplitLine key={`${side}-${index}`} />
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
