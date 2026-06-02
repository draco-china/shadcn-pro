import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  fieldRelativeRootClassName,
  fieldTriggerIconClassName,
  fieldTriggerLabelClassName,
} from '../shared/field'
import { FieldPopoverTriggerRoot } from '../shared/popover'
import { FieldPopoverClear, FieldPopoverTrigger } from '../shared/trigger'
import type { DateTimePickerProps } from './types'

export function DateTimePickerTrigger({
  value,
  placeholder,
  disabled,
  size,
  className,
  showClear,
  onClear,
}: Pick<DateTimePickerProps, 'value' | 'placeholder' | 'disabled' | 'size' | 'className'> & {
  showClear: boolean
  onClear: () => void
}) {
  const hasValue = value !== undefined

  return (
    <div className={cn(fieldRelativeRootClassName, className)}>
      <FieldPopoverTriggerRoot asChild>
        <FieldPopoverTrigger
          size={size}
          disabled={disabled}
          hasValue={hasValue}
          showClear={showClear}
        >
          <CalendarIcon className={fieldTriggerIconClassName} />
          <span className={fieldTriggerLabelClassName}>
            {value ? format(value, 'PPP HH:mm:ss') : placeholder}
          </span>
        </FieldPopoverTrigger>
      </FieldPopoverTriggerRoot>
      <FieldPopoverClear showClear={showClear} label="Clear date and time" onClear={onClear} />
    </div>
  )
}
