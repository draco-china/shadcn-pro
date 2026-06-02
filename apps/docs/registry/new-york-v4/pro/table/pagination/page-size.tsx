import {
  FieldSelect,
  FieldSelectContent,
  FieldSelectItem,
  FieldSelectTrigger,
  FieldSelectValue,
} from '@/components/pro/base/fields/shared/select'
import {
  paginationPageSizeClassName,
  paginationPageSizeLabelClassName,
  paginationPageSizeTriggerClassName,
} from './classes'
import type { ProTablePaginationLabels } from './types'

interface PaginationPageSizeProps {
  value: number
  options: number[]
  labels?: ProTablePaginationLabels
  onChange: (value: number) => void
}

export function PaginationPageSize({ value, options, labels, onChange }: PaginationPageSizeProps) {
  return (
    <div className={paginationPageSizeClassName}>
      <span className={paginationPageSizeLabelClassName}>{labels?.rows ?? 'Rows'}</span>
      <FieldSelect value={`${value}`} onValueChange={(nextValue) => onChange(Number(nextValue))}>
        <FieldSelectTrigger className={paginationPageSizeTriggerClassName}>
          <FieldSelectValue />
        </FieldSelectTrigger>
        <FieldSelectContent side="top">
          {options.map((size) => (
            <FieldSelectItem key={size} value={`${size}`}>
              {size}
            </FieldSelectItem>
          ))}
        </FieldSelectContent>
      </FieldSelect>
    </div>
  )
}
