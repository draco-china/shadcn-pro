'use client'

import { X } from 'lucide-react'
import * as React from 'react'
import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.ComponentProps<typeof ShadcnInput>, 'prefix'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  allowClear?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      prefix,
      suffix,
      allowClear,
      onClear,
      className,
      type,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const hasValue = currentValue !== '' && currentValue !== undefined && currentValue !== null

    const showClear = allowClear && hasValue

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    }

    function handleClear(
      e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
    ) {
      e.preventDefault()
      e.stopPropagation()
      if (!isControlled) setInternalValue('')
      onClear?.()
      const inputEl = inputRef.current
      if (inputEl) {
        inputEl.value = ''
        onChange?.({
          ...e,
          target: inputEl,
          currentTarget: inputEl,
        } as unknown as React.ChangeEvent<HTMLInputElement>)
      }
    }

    return (
      <div
        className={cn(
          'flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 shadow-xs',
          'transition-[color,box-shadow]',
          'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
          'has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
          'has-disabled:pointer-events-none has-disabled:opacity-50',
          'dark:bg-input/30',
          className,
        )}
      >
        {prefix && (
          <span className="mr-2 shrink-0 text-sm text-muted-foreground select-none">{prefix}</span>
        )}

        <ShadcnInput
          ref={inputRef}
          type={type}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          className="h-auto flex-1 min-w-0 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          {...props}
        />

        {showClear && (
          <button
            type="button"
            onPointerDown={handleClear}
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear input"
            className="ml-1.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </button>
        )}

        {suffix && (
          <span className="ml-2 shrink-0 text-sm text-muted-foreground select-none">{suffix}</span>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
