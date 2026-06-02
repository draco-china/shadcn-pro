'use client'

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayPicker, type DayPickerProps } from 'react-day-picker'
import type { ProButtonVariant } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  fieldCalendarChevronClassName,
  fieldCalendarRootClassName,
  fieldCalendarRtlNextClassName,
  fieldCalendarRtlPreviousClassName,
  fieldCalendarWeekNumberContentClassName,
  getFieldCalendarClassNames,
} from './calendar-class-names'
import { FieldCalendarDayButton } from './calendar-day-button'

export type FieldCalendarProps = DayPickerProps & {
  buttonVariant?: ProButtonVariant
}

export function FieldCalendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  showWeekNumber,
  ...props
}: FieldCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      showWeekNumber={showWeekNumber}
      className={cn(
        fieldCalendarRootClassName,
        fieldCalendarRtlNextClassName,
        fieldCalendarRtlPreviousClassName,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={getFieldCalendarClassNames({
        buttonVariant,
        captionLayout,
        classNames,
        showWeekNumber,
      })}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => (
          <div data-slot="field-calendar" ref={rootRef} className={className} {...rootProps} />
        ),
        Chevron: ({ className, orientation, ...chevronProps }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn(fieldCalendarChevronClassName, className)}
                {...chevronProps}
              />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn(fieldCalendarChevronClassName, className)}
                {...chevronProps}
              />
            )
          }

          return (
            <ChevronDownIcon
              className={cn(fieldCalendarChevronClassName, className)}
              {...chevronProps}
            />
          )
        },
        DayButton: FieldCalendarDayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className={fieldCalendarWeekNumberContentClassName}>{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}
