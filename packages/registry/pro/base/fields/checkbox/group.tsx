import { ProLabel } from '@/components/pro/base/label'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  checkboxDescriptionClassName,
  checkboxGroupClassName,
  checkboxLabelDisabledClassName,
  checkboxLabelEnabledClassName,
  checkboxOptionLabelClassName,
  checkboxRootClassName,
} from './classes'
import { CheckboxControl } from './control'
import type { CheckboxBaseProps, CheckboxOption } from './types'

export function CheckboxGroup({
  id,
  value,
  options,
  disabled,
  itemClassName,
  labelClassName,
  onChange,
  checkboxProps,
}: {
  id: string
  value: string[]
  options: CheckboxOption[]
  disabled?: boolean
  itemClassName?: string
  labelClassName?: string
  onChange: (value: string[]) => void
  checkboxProps: Omit<
    CheckboxBaseProps,
    | 'children'
    | 'defaultValue'
    | 'id'
    | 'itemClassName'
    | 'labelClassName'
    | 'onChange'
    | 'options'
    | 'value'
  >
}) {
  return (
    <div className={checkboxGroupClassName}>
      {options.map((option, index) => {
        const itemId = `${id}-${index}`
        const checked = value.includes(option.value)
        const itemDisabled = disabled || option.disabled

        return (
          <div key={option.value} className={cn(checkboxRootClassName, itemClassName)}>
            <CheckboxControl
              id={itemId}
              checked={checked}
              disabled={itemDisabled}
              onCheckedChange={(nextChecked) => {
                onChange(
                  nextChecked === true
                    ? Array.from(new Set([...value, option.value]))
                    : value.filter((item) => item !== option.value),
                )
              }}
              {...checkboxProps}
            />
            <ProLabel
              htmlFor={itemId}
              className={cn(
                checkboxOptionLabelClassName,
                itemDisabled ? checkboxLabelDisabledClassName : checkboxLabelEnabledClassName,
                labelClassName,
              )}
            >
              <span>{option.label}</span>
              {isRenderableNode(option.description) && (
                <span className={checkboxDescriptionClassName}>{option.description}</span>
              )}
            </ProLabel>
          </div>
        )
      })}
    </div>
  )
}
