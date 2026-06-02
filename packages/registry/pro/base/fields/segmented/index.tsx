'use client'

import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import { segmentedItemVariants } from './classes'
import type { SegmentedProps } from './types'

export type { SegmentedOption, SegmentedProps } from './types'

export function Segmented({
  value,
  defaultValue,
  onChange,
  options,
  variant = 'outline',
  size = 'default',
  disabled,
  className,
}: SegmentedProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="segmented"
      data-variant={variant}
      data-size={size}
      type="single"
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(nextValue) => {
        if (nextValue) onChange?.(nextValue)
      }}
      className={cn(
        'group/toggle-group flex w-fit items-center gap-0 rounded-md data-[variant=outline]:shadow-xs',
        className,
      )}
    >
      {options?.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          data-slot="segmented-item"
          data-variant={variant}
          data-size={size}
          data-spacing={0}
          value={option.value}
          disabled={option.disabled}
          className={cn(
            segmentedItemVariants({ variant, size }),
            'w-auto min-w-0 shrink-0 rounded-none px-3 shadow-none first:rounded-l-md last:rounded-r-md data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l focus:z-10 focus-visible:z-10',
          )}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
