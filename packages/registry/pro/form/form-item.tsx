'use client'

import { useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { formItemClassName } from './classes'
import { FormItemError, FormItemExtra } from './form-item-help'
import { FormItemLabel } from './form-item-label'
import { fieldView } from './formily-fields/field'

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
   * Field description. Falls back to field.description and renders as the label tooltip.
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
    const formField = fieldView(useField())

    const fieldLabel = label ?? formField.title
    const fieldRequired = required ?? formField.required
    const errors = formField.selfErrors ?? []
    const fieldTooltip = tooltip ?? description ?? formField.description

    return (
      <div className={cn(formItemClassName, className)}>
        <FormItemLabel
          htmlFor={formField.path?.toString()}
          label={fieldLabel}
          required={fieldRequired}
          disabled={formField.disabled}
          tooltip={fieldTooltip}
        />
        {children}
        <FormItemError errors={errors} />
        <FormItemExtra extra={extra} />
      </div>
    )
  },
)

FormItem.displayName = 'FormItem'
