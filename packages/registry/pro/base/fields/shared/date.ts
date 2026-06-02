import { format } from 'date-fns'

export function formatDate(value: Date, dateFormat = 'PPP') {
  return format(value, dateFormat)
}

export function formatDateRange(from?: Date, to?: Date) {
  if (!from) return undefined
  if (!to) return formatDate(from, 'LLL dd, y')

  return `${formatDate(from, 'LLL dd, y')} - ${formatDate(to, 'LLL dd, y')}`
}
