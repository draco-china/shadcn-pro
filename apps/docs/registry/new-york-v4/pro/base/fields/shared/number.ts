export function isValidNumber(value: number | null | undefined): value is number {
  return value !== undefined && value !== null && !Number.isNaN(value)
}

export function parseNumberInput(value: string): number | undefined {
  if (value === '') return undefined

  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

export function normalizeNumberRange<T extends { min?: number; max?: number }>(
  value: T,
): T | undefined {
  return isValidNumber(value.min) || isValidNumber(value.max) ? value : undefined
}

export function parseMoneyInput(value: string, precision: number): number | undefined {
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ''))
  if (Number.isNaN(parsed)) return undefined

  const factor = 10 ** precision
  return Math.round(parsed * factor) / factor
}
