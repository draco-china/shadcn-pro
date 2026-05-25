import { diffLines } from 'diff'

export type DiffView = 'split' | 'unified'

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  oldLineNo?: number
  newLineNo?: number
}

export function computeUnifiedDiff(oldCode: string, newCode: string): DiffLine[] {
  const changes = diffLines(oldCode, newCode)
  const lines: DiffLine[] = []
  let oldNo = 1
  let newNo = 1

  for (const change of changes) {
    const parts = change.value.split('\n')
    if (parts.at(-1) === '') parts.pop()
    for (const part of parts) {
      if (change.added) lines.push({ type: 'added', content: part, newLineNo: newNo++ })
      else if (change.removed) lines.push({ type: 'removed', content: part, oldLineNo: oldNo++ })
      else lines.push({ type: 'unchanged', content: part, oldLineNo: oldNo++, newLineNo: newNo++ })
    }
  }

  return lines
}

export function computeSplitDiff(oldCode: string, newCode: string) {
  const unified = computeUnifiedDiff(oldCode, newCode)
  const left: (DiffLine | null)[] = []
  const right: (DiffLine | null)[] = []

  for (const line of unified) {
    if (line.type === 'added') {
      left.push(null)
      right.push(line)
    } else if (line.type === 'removed') {
      left.push(line)
      right.push(null)
    } else {
      left.push(line)
      right.push(line)
    }
  }

  return { unified, left, right }
}

export function countDiffLines(lines: DiffLine[]) {
  return {
    added: lines.filter((line) => line.type === 'added').length,
    removed: lines.filter((line) => line.type === 'removed').length,
  }
}
