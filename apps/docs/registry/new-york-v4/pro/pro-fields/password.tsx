'use client'

import { Eye, EyeOff, X } from 'lucide-react'
import * as React from 'react'
import { Input as ShadcnInput } from '@/registry/new-york-v4/ui/input'
import { cn } from '@/lib/utils'

export interface PasswordProps extends Omit<React.ComponentProps<typeof ShadcnInput>, 'type'> {
  suffix?: React.ReactNode
  inputClassName?: string
  allowClear?: boolean
  onClear?: () => void
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  (
    {
      className,
      suffix,
      inputClassName,
      allowClear = true,
      onClear,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const hasValue = currentValue !== '' && currentValue !== undefined && currentValue !== null
    const showClear = allowClear && hasValue && !props.disabled && !props.readOnly

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (!isControlled) setInternalValue(event.target.value)
      onChange?.(event)
    }

    function handleClear(
      event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
    ) {
      event.preventDefault()
      event.stopPropagation()
      if (!isControlled) setInternalValue('')
      onClear?.()
      const inputEl = inputRef.current
      if (inputEl) {
        inputEl.value = ''
        onChange?.({
          ...event,
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
        <ShadcnInput
          ref={inputRef}
          type={visible ? 'text' : 'password'}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          className={cn(
            'h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent',
            inputClassName,
          )}
          {...props}
        />
        {suffix && (
          <span className="ml-2 shrink-0 select-none text-sm text-muted-foreground">{suffix}</span>
        )}
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear password"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="ml-1.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((value) => !value)}
          className="ml-1.5 shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    )
  },
)
Password.displayName = 'Password'

export { Password }
