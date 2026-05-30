'use client'

import type * as React from 'react'
import { Switch as ShadcnSwitch } from '@/components/ui/switch'

export interface SwitchProps
  extends Omit<
    React.ComponentProps<typeof Switch>,
    'checked' | 'onCheckedChange' | 'onChange' | 'value'
  > {
  value?: boolean
  onChange?: (checked: boolean) => void
}

export function Switch({ value, onChange, ...props }: SwitchProps) {
  return <ShadcnSwitch {...props} checked={value} onCheckedChange={onChange} />
}
