import { X } from 'lucide-react'
import type { MouseEvent } from 'react'
import { ProButton, type ProButtonProps } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import { fieldIconButtonClassName } from './classes'

export {
  type FieldSize,
  fieldAutoPopoverContentClassName,
  fieldClearButtonClassName,
  fieldControlClassName,
  fieldInlineTriggerLabelClassName,
  fieldRelativeRootClassName,
  fieldShellClassName,
  fieldTriggerClassName,
  fieldTriggerIconClassName,
  fieldTriggerLabelClassName,
} from './classes'

export function FieldClearButton({
  label = 'Clear value',
  className,
  onClear,
}: {
  label?: string
  className?: string
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <FieldIconButton
      tabIndex={-1}
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onClick={(event) => {
        event.stopPropagation()
        onClear(event)
      }}
      className={className}
    >
      <X size={14} />
    </FieldIconButton>
  )
}

export function FieldIconButton({
  className,
  variant = 'ghost',
  size = 'icon-sm',
  ...props
}: ProButtonProps) {
  return (
    <ProButton
      type="button"
      variant={variant}
      size={size}
      className={cn(fieldIconButtonClassName, className)}
      {...props}
    />
  )
}
