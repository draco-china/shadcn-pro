import { ProBadge } from '@/components/pro/base/badge'
import type { ProTableFilterOption } from '../types'
import {
  tableFilterBadgeClassName,
  tableFilterBadgesClassName,
  tableFilterEmptyClassName,
} from './classes'

export function AutoFilterCell({
  value,
  options,
  variant = 'badge',
}: {
  value: string | string[] | undefined
  options: ProTableFilterOption[]
  variant?: 'badge' | 'text'
}) {
  const values = Array.isArray(value) ? value : value ? [value] : []
  const selectedOptions = values.map((itemValue) => ({
    value: itemValue,
    label: options.find((option) => option.value === itemValue)?.label ?? itemValue,
  }))

  if (selectedOptions.length === 0) return <span className={tableFilterEmptyClassName}>—</span>

  if (variant === 'text') {
    return <span>{selectedOptions.map((option) => option.label).join(', ')}</span>
  }

  return (
    <div className={tableFilterBadgesClassName}>
      {selectedOptions.map((option) => (
        <ProBadge key={option.value} variant="secondary" className={tableFilterBadgeClassName}>
          {option.label}
        </ProBadge>
      ))}
    </div>
  )
}
