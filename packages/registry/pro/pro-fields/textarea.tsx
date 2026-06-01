'use client'

import { X } from 'lucide-react'
import * as React from 'react'
import { Textarea as ShadcnTextarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.ComponentProps<typeof ShadcnTextarea> {
  allowClear?: boolean
  onClear?: () => void
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      allowClear = true,
      onClear,
      className,
      value,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

    React.useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const hasValue = currentValue !== '' && currentValue !== undefined && currentValue !== null
    const showClear = allowClear && hasValue && !disabled && !readOnly

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
      const textareaEl = textareaRef.current
      if (textareaEl) {
        textareaEl.value = ''
        onChange?.({
          ...event,
          target: textareaEl,
          currentTarget: textareaEl,
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>)
      }
    }

    return (
      <div className="relative w-full">
        <ShadcnTextarea
          ref={textareaRef}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(showClear && 'pr-8', className)}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear textarea"
            onPointerDown={handleClear}
            onClick={handleClear}
            className="absolute top-2 right-2 z-10 flex size-5 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
