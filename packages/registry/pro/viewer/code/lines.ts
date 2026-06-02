import type { ThemedToken } from 'shiki'

export interface CodeLine {
  index: number
  tokens: ThemedToken[]
  content: string
  indent: number
  isFoldable: boolean
  foldEnd: number
}

function getIndent(value: string): number {
  let index = 0
  while (index < value.length && (value[index] === ' ' || value[index] === '\t')) index++
  return index
}

export function buildCodeLines(rawLines: string[], tokenLines: ThemedToken[][]): CodeLine[] {
  const lines: CodeLine[] = rawLines.map((content, index) => ({
    index,
    tokens: tokenLines[index] ?? [],
    content,
    indent: getIndent(content),
    isFoldable: false,
    foldEnd: index,
  }))

  for (let index = 0; index < lines.length - 1; index++) {
    const trimmed = lines[index].content.trimEnd()
    const lastChar = trimmed.at(-1)
    if (
      (lastChar === '{' || lastChar === '[' || lastChar === '(') &&
      lines[index + 1].indent > lines[index].indent
    ) {
      let end = index + 1
      while (end + 1 < lines.length && lines[end + 1].indent > lines[index].indent) end++
      lines[index].isFoldable = true
      lines[index].foldEnd = end
    }
  }

  return lines
}

export function getHiddenCodeLines(collapsed: Set<number>, lines: CodeLine[]) {
  const hidden = new Set<number>()
  for (const foldLine of collapsed) {
    const line = lines[foldLine]
    if (!line) continue
    for (let index = foldLine + 1; index <= line.foldEnd; index++) hidden.add(index)
  }
  return hidden
}
