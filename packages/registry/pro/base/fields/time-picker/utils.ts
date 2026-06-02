export const timeOptions = {
  hour: Array.from({ length: 24 }, (_, value) => value),
  minute: Array.from({ length: 60 }, (_, value) => value),
  second: Array.from({ length: 60 }, (_, value) => value),
}

export function padTimePart(value: number) {
  return String(value).padStart(2, '0')
}

export function parseTimeValue(value?: string) {
  const parts = value ? value.split(':') : []

  return {
    hour: parts[0] ? Number(parts[0]) : 0,
    minute: parts[1] ? Number(parts[1]) : 0,
    second: parts[2] ? Number(parts[2]) : 0,
  }
}

export function formatTimeValue(hour: number, minute: number, second: number) {
  return `${padTimePart(hour)}:${padTimePart(minute)}:${padTimePart(second)}`
}
