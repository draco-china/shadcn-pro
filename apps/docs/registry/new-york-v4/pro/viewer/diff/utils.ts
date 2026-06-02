import { diffLines } from 'diff'

export type DiffView = 'split' | 'unified'
export const DIFF_VIEWS: DiffView[] = ['split', 'unified']

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  oldLineNo?: number
  newLineNo?: number
}

export function computeUnifiedDiff(oldCode: string, newCode: string): DiffLine[] {
  const changes = diffLines(oldCode, newCode)
  let oldNo = 1
  let newNo = 1

  return changes.flatMap((change) =>
    getDiffParts(change.value).map((part) => {
      if (change.added) return { type: 'added', content: part, newLineNo: newNo++ }
      if (change.removed) return { type: 'removed', content: part, oldLineNo: oldNo++ }
      return { type: 'unchanged', content: part, oldLineNo: oldNo++, newLineNo: newNo++ }
    }),
  )
}

export function computeSplitDiff(oldCode: string, newCode: string) {
  const unified = computeUnifiedDiff(oldCode, newCode)
  const pairs = unified.map(getSplitDiffPair)

  return {
    unified,
    left: pairs.map(([left]) => left),
    right: pairs.map(([, right]) => right),
  }
}

export function countDiffLines(lines: DiffLine[]) {
  return {
    added: lines.filter((line) => line.type === 'added').length,
    removed: lines.filter((line) => line.type === 'removed').length,
  }
}

export function getDiffLineKey(line: DiffLine) {
  return `${line.type}:${line.oldLineNo ?? ''}:${line.newLineNo ?? ''}:${line.content}`
}

function getDiffParts(value: string) {
  const parts = value.split('\n')
  return parts.at(-1) === '' ? parts.slice(0, -1) : parts
}

function getSplitDiffPair(line: DiffLine): [DiffLine | null, DiffLine | null] {
  if (line.type === 'added') return [null, line]
  if (line.type === 'removed') return [line, null]
  return [line, line]
}
