/** Keeps only a leading minus sign, digits, and one decimal separator. */
export function normalizeMoneyInput(value: string) {
  const negative = value.trimStart().startsWith('-')
  const unsigned = value.replace(/[^0-9.]/g, '')
  const dotIndex = unsigned.indexOf('.')
  const normalized =
    dotIndex === -1
      ? unsigned
      : `${unsigned.slice(0, dotIndex)}.${unsigned.slice(dotIndex + 1).replaceAll('.', '')}`
  return negative ? `-${normalized}` : normalized
}

/** Parses a complete money input while preserving empty intermediate states. */
export function parseMoneyValue(value: string) {
  if (value === '' || value === '-' || value === '.' || value === '-.') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

/** Formats an optional numeric value for the editable money input. */
export function formatMoneyValue(value: number | undefined) {
  return value === undefined ? '' : String(value)
}
