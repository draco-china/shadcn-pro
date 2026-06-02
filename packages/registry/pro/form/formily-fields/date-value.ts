export function toDate(value: Date | string | undefined) {
  if (value instanceof Date) return value
  if (typeof value === 'string' && value) return new Date(value)
  return undefined
}
