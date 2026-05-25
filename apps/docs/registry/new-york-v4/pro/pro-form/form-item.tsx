'use client'

import { useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface FormItemProps {
  className?: string
  children?: ReactNode
  /**
   * Override label (falls back to field.title)
   */
  label?: string
  /**
   * Override required (falls back to field.required)
   */
  required?: boolean
  /**
   * Extra description below the field
   */
  description?: ReactNode
  /**
   * Optional label tooltip
   */
  tooltip?: ReactNode
  extra?: ReactNode
}

export const FormItem = observer(
  ({ className, children, label, required, description, tooltip, extra }: FormItemProps) => {
    const field = useField()
    const formField = field as {
      title?: string
      required?: boolean
      selfErrors?: string[]
      description?: ReactNode
      path?: { toString: () => string }
      disabled?: boolean
    }

    const fieldLabel = label ?? formField.title
    const fieldRequired = required ?? formField.required
    const errors = formField.selfErrors ?? []
    const fieldDescription = description ?? formField.description
    const fieldTooltip = tooltip

    return (
      <div className={cn('space-y-1.5', className)}>
        {fieldLabel && (
          <div className="flex items-center gap-1.5">
            <Label
              htmlFor={formField.path?.toString()}
              className={cn(
                'text-sm font-medium leading-none',
                formField.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {fieldLabel}
            </Label>
            {fieldTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="size-3.5 cursor-help text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="max-w-xs text-xs">{fieldTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {fieldRequired && (
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </div>
        )}

        {children}

        {fieldDescription && <p className="text-xs text-muted-foreground">{fieldDescription}</p>}

        {errors.length > 0 && (
          <p className="text-xs text-destructive" role="alert">
            {errors.join(', ')}
          </p>
        )}

        {extra && <div className="text-xs text-muted-foreground">{extra}</div>}
      </div>
    )
  },
)

FormItem.displayName = 'FormItem'
