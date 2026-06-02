import { type ButtonHTMLAttributes, forwardRef, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import {
  FieldClearButton,
  type FieldSize,
  fieldClearButtonClassName,
  fieldTriggerClassName,
} from './field'

export interface FieldTriggerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FieldSize
  hasValue?: boolean
}

export const FieldTriggerButton = forwardRef<HTMLButtonElement, FieldTriggerButtonProps>(
  ({ size = 'default', hasValue = true, className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-size={size}
      className={cn(fieldTriggerClassName, !hasValue && 'text-muted-foreground', className)}
      {...props}
    />
  ),
)

FieldTriggerButton.displayName = 'FieldTriggerButton'

export interface FieldPopoverTriggerProps extends FieldTriggerButtonProps {
  showClear?: boolean
}

export const FieldPopoverTrigger = forwardRef<HTMLButtonElement, FieldPopoverTriggerProps>(
  ({ showClear, className, children, ...triggerProps }, ref) => (
    <FieldTriggerButton ref={ref} {...triggerProps} className={cn(showClear && 'pr-8', className)}>
      {children}
    </FieldTriggerButton>
  ),
)

FieldPopoverTrigger.displayName = 'FieldPopoverTrigger'

export function FieldPopoverClear({
  showClear,
  label,
  onClear,
}: {
  showClear?: boolean
  label?: string
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  if (!showClear) return null

  return <FieldClearButton label={label} onClear={onClear} className={fieldClearButtonClassName} />
}
