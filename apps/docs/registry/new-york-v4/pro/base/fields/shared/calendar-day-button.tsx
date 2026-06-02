'use client'

import { useEffect, useRef } from 'react'
import { type DayButtonProps, getDefaultClassNames } from 'react-day-picker'
import { buttonVariants } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import { fieldCalendarDayButtonClassName } from './calendar-class-names'

export function FieldCalendarDayButton({ className, day, modifiers, ...props }: DayButtonProps) {
  const defaultClassNames = getDefaultClassNames()
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'icon' }),
        fieldCalendarDayButtonClassName,
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}
