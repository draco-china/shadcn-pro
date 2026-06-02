'use client'

import { Switch as SwitchPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { switchRootClassName, switchThumbClassName } from './classes'
import type { SwitchProps } from './types'

export type { SwitchProps } from './types'

export function Switch({ value, onChange, size = 'default', className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      checked={value}
      onCheckedChange={onChange}
      className={cn(switchRootClassName, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={switchThumbClassName} />
    </SwitchPrimitive.Root>
  )
}
