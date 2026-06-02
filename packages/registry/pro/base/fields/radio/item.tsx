import { CircleIcon } from 'lucide-react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { ProLabel } from '@/components/pro/base/label'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  radioDescriptionClassName,
  radioIndicatorClassName,
  radioIndicatorIconClassName,
  radioItemClassName,
  radioLabelClassName,
  radioLabelDisabledClassName,
  radioLabelEnabledClassName,
  radioOptionRootClassName,
} from './classes'
import type { RadioItemProps } from './types'

export function RadioItem({ option, id, disabled, itemClassName, labelClassName }: RadioItemProps) {
  const itemDisabled = disabled || option.disabled

  return (
    <div className={cn(radioOptionRootClassName, itemClassName)}>
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        value={option.value}
        id={id}
        disabled={itemDisabled}
        className={radioItemClassName}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className={radioIndicatorClassName}
        >
          <CircleIcon className={radioIndicatorIconClassName} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <ProLabel
        htmlFor={id}
        className={cn(
          radioLabelClassName,
          itemDisabled ? radioLabelDisabledClassName : radioLabelEnabledClassName,
          labelClassName,
        )}
      >
        <span>{option.label}</span>
        {isRenderableNode(option.description) && (
          <span className={radioDescriptionClassName}>{option.description}</span>
        )}
      </ProLabel>
    </div>
  )
}
