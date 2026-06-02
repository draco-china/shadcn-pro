import type { KeyboardEvent } from 'react'
import { Input } from '@/components/pro/base/fields/input'
import {
  paginationQuickJumpClassName,
  paginationQuickJumpInputClassName,
  paginationQuickJumpLabelClassName,
  paginationQuickJumpRootClassName,
} from './classes'
import type { ProTablePaginationLabels } from './types'

interface PaginationQuickJumpProps {
  value: string
  max: number
  labels?: ProTablePaginationLabels
  onChange: (value: string) => void
  onJump: (page: number) => void
}

export function PaginationQuickJump({
  value,
  max,
  labels,
  onChange,
  onJump,
}: PaginationQuickJumpProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    const page = Number(value)
    if (!Number.isNaN(page) && page >= 1 && page <= max) onJump(page)
    onChange('')
  }

  return (
    <div className={paginationQuickJumpClassName}>
      <span className={paginationQuickJumpLabelClassName}>{labels?.goTo ?? 'Go to'}</span>
      <Input
        type="number"
        min={1}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-label={labels?.goTo ?? 'Go to page'}
        allowClear={false}
        inputClassName={paginationQuickJumpInputClassName}
        className={paginationQuickJumpRootClassName}
      />
    </div>
  )
}
