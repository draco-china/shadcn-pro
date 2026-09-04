'use client'

import { CircleIcon, Star } from 'lucide-react'
import { RadioGroup as RadioGroupPrimitive, ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { type FocusEventHandler, type ReactNode, useId, useState } from 'react'
import { cn } from '@/lib/utils'

/** Radio group rendered from labeled options. */
export function Radio({
  value,
  defaultValue,
  onChange,
  disabled,
  options,
  className,
  name,
  required,
  onBlur,
}: {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  options?: {
    label: ReactNode
    value: string
    description?: ReactNode
    disabled?: boolean
  }[]
  className?: string
  required?: boolean
  name?: string
  onBlur?: FocusEventHandler<HTMLDivElement>
}) {
  const generatedId = useId()

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      disabled={disabled}
      name={name}
      required={required}
      onBlur={onBlur}
      className={cn('flex flex-col gap-2', className)}
    >
      {options?.map((opt, index) => {
        const itemId = `${generatedId}-${index}`

        return (
          <div key={opt.value} className="flex items-start gap-2">
            <RadioGroupPrimitive.Item
              data-slot="radio-group-item"
              value={opt.value}
              id={itemId}
              disabled={disabled || opt.disabled}
              className={
                'aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40'
              }
            >
              <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="relative flex items-center justify-center"
              >
                <CircleIcon
                  className={
                    'absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary'
                  }
                />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <label
              htmlFor={itemId}
              className={cn(
                'grid gap-1 text-sm leading-none font-normal select-none',
                disabled || opt.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              )}
            >
              <span>{opt.label}</span>
              {opt.description != null && (
                <span className="text-xs leading-snug text-muted-foreground">
                  {opt.description}
                </span>
              )}
            </label>
          </div>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
}

/** Single-value segmented toggle group. */
export function Segmented({
  value,
  defaultValue,
  onChange,
  options,
  disabled,
  className,
  name,
  onBlur,
}: {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options?: {
    label: ReactNode
    value: string
    disabled?: boolean
  }[]
  disabled?: boolean
  className?: string
  name?: string
  onBlur?: FocusEventHandler<HTMLDivElement>
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const currentValue = value ?? internalValue

  return (
    <>
      {name && <input type="hidden" name={name} value={currentValue} />}
      <ToggleGroupPrimitive.Root
        data-slot="segmented"
        type="single"
        value={currentValue}
        disabled={disabled}
        onBlur={onBlur}
        onValueChange={(nextValue) => {
          if (!nextValue) return
          if (value === undefined) setInternalValue(nextValue)
          onChange?.(nextValue)
        }}
        className={cn(
          'group/toggle-group flex w-fit items-center gap-0 rounded-md shadow-xs',
          className,
        )}
      >
        {options?.map((option) => (
          <ToggleGroupPrimitive.Item
            key={option.value}
            data-slot="segmented-item"
            value={option.value}
            disabled={option.disabled}
            className={
              "inline-flex h-9 w-auto min-w-0 shrink-0 items-center justify-center gap-2 rounded-none border border-l-0 border-input bg-transparent px-3 text-sm font-medium whitespace-nowrap shadow-none transition-[color,box-shadow] outline-none first:rounded-l-md first:border-l last:rounded-r-md hover:bg-accent hover:text-accent-foreground focus:z-10 focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            }
          >
            {option.label}
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
    </>
  )
}

/** Accessible one-to-five star rating control. */
export function Rate({
  value,
  defaultValue = 0,
  onChange,
  disabled,
  className,
  name,
  id,
  'aria-label': ariaLabel = 'Rating',
  onBlur,
}: {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
  name?: string
  id?: string
  'aria-label'?: string
  onBlur?: FocusEventHandler<HTMLDivElement>
}) {
  const generatedId = useId()
  const [hovered, setHovered] = useState<number | null>(null)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const currentValue = value ?? internalValue

  return (
    <div
      className={cn('flex gap-0.5', className)}
      role="radiogroup"
      aria-label={ariaLabel}
      onBlur={onBlur}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className={cn('cursor-pointer p-0.5', disabled && 'cursor-not-allowed opacity-50')}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        >
          <input
            id={id ? `${id}-${star}` : undefined}
            type="radio"
            name={name ?? generatedId}
            value={star}
            checked={currentValue === star}
            disabled={disabled}
            aria-label={star === 1 ? '1 star' : `${star} stars`}
            className="peer sr-only"
            onChange={() => {
              if (disabled) return
              if (value === undefined) setInternalValue(star)
              onChange?.(star)
            }}
          />
          <Star
            className={cn(
              'size-5 rounded-sm transition-colors peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-focus-visible:outline-none',
              star <= (hovered ?? currentValue)
                ? 'fill-primary text-primary'
                : 'text-muted-foreground',
            )}
          />
        </label>
      ))}
    </div>
  )
}
