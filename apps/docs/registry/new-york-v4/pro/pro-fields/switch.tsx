'use client'

import type * as React from 'react'
import { Switch } from '@/components/ui/switch'

export interface SwitchBaseProps
  extends Omit<
    React.ComponentProps<typeof Switch>,
    'checked' | 'onCheckedChange' | 'onChange' | 'value'
  > {
  value?: boolean
  onChange?: (checked: boolean) => void
}

export function SwitchBase({ value, onChange, ...props }: SwitchBaseProps) {
  return <Switch {...props} checked={value} onCheckedChange={onChange} />
}
