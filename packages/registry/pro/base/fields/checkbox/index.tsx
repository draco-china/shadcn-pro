'use client'

import { useId } from 'react'
import { ProLabel } from '@/components/pro/base/label'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  checkboxLabelClassName,
  checkboxLabelDisabledClassName,
  checkboxLabelEnabledClassName,
  checkboxRootClassName,
} from './classes'
import { CheckboxControl } from './control'
import { CheckboxGroup } from './group'
import type { CheckboxBaseProps } from './types'
import { useCheckboxGroup } from './use-checkbox-group'

export type { CheckboxBaseProps, CheckboxOption } from './types'

export function Checkbox({
  value,
  defaultValue,
  onChange,
  options,
  disabled,
  children,
  labelClassName,
  itemClassName,
  id,
  ...props
}: CheckboxBaseProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const groupOptions = options?.length ? options : undefined
  const checkboxGroup = useCheckboxGroup({ value, defaultValue, onChange })

  if (groupOptions) {
    return (
      <CheckboxGroup
        id={checkboxId}
        value={checkboxGroup.values}
        options={groupOptions}
        disabled={disabled}
        itemClassName={itemClassName}
        labelClassName={labelClassName}
        checkboxProps={props}
        onChange={checkboxGroup.commit}
      />
    )
  }

  return (
    <div className={checkboxRootClassName}>
      <CheckboxControl
        id={checkboxId}
        checked={typeof value === 'boolean' ? value : undefined}
        defaultChecked={typeof defaultValue === 'boolean' ? defaultValue : undefined}
        onCheckedChange={(checked) => onChange?.(checked === true)}
        disabled={disabled}
        {...props}
      />
      {isRenderableNode(children) && (
        <ProLabel
          htmlFor={checkboxId}
          className={cn(
            checkboxLabelClassName,
            disabled ? checkboxLabelDisabledClassName : checkboxLabelEnabledClassName,
            labelClassName,
          )}
        >
          {children}
        </ProLabel>
      )}
    </div>
  )
}
