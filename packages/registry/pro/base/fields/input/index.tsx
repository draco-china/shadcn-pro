'use client'

import { Eye, EyeOff } from 'lucide-react'
import { Slider as SliderPrimitive } from 'radix-ui'
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type ComponentProps,
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'
import { FieldClearButton, fieldShellClassName } from '../shared/field'

interface InputProps
  extends Omit<
    ComponentProps<'input'>,
    'children' | 'className' | 'defaultValue' | 'onChange' | 'prefix' | 'value'
  > {
  value?: string | number | readonly string[]
  defaultValue?: string | number | readonly string[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
  inputClassName?: string
  prefix?: ReactNode
  suffix?: ReactNode
  allowClear?: boolean
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      prefix,
      suffix,
      allowClear = true,
      onClear,
      className,
      inputClassName,
      type,
      value,
      defaultValue,
      onChange,
      disabled,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    function setInputRef(node: HTMLInputElement | null) {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
        return
      }
      if (ref) ref.current = node
    }

    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const currentValue = value ?? internalValue
    const showClear =
      !!allowClear && currentValue !== '' && currentValue != null && !disabled && !readOnly
    const hasPrefix = prefix != null && prefix !== false
    const hasSuffix = (suffix != null && suffix !== false) || showClear

    function emitValue(nextValue: string, event?: ChangeEvent<HTMLInputElement>) {
      if (value === undefined) setInternalValue(nextValue)
      const inputEl = inputRef.current
      if (!inputEl) return

      inputEl.value = nextValue
      onChange?.({
        ...event,
        target: inputEl,
        currentTarget: inputEl,
      } as ChangeEvent<HTMLInputElement>)
    }

    return (
      <div
        className={cn(
          fieldShellClassName,
          hasPrefix && 'pl-0',
          hasSuffix && 'pr-0',
          disabled && 'pointer-events-none opacity-50',
          className,
        )}
      >
        {hasPrefix && <div className="flex shrink-0 items-center">{prefix}</div>}

        <input
          ref={setInputRef}
          type={type}
          data-slot="input"
          value={String(currentValue ?? '')}
          onChange={(event) => emitValue(event.target.value, event)}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            'h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-base shadow-none outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm dark:bg-transparent',
            inputClassName,
          )}
          {...props}
        />

        {hasSuffix && (
          <div className="flex shrink-0 items-center">
            {showClear && (
              <FieldClearButton
                label="Clear input"
                className="ml-0"
                onClear={() => {
                  onClear?.()
                  emitValue('')
                }}
              />
            )}
            {suffix}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export const Password = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, suffix, inputClassName, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <Input
        ref={ref}
        {...props}
        type={visible ? 'text' : 'password'}
        className={className}
        inputClassName={inputClassName}
        suffix={
          <>
            {suffix}
            <ProButton
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
              onClick={() => setVisible((value) => !value)}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? <EyeOff /> : <Eye />}
            </ProButton>
          </>
        }
      />
    )
  },
)
Password.displayName = 'Password'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<'textarea'> & { onClear?: () => void }
>(({ onClear, className, value, defaultValue, onChange, disabled, readOnly, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  function setTextareaRef(node: HTMLTextAreaElement | null) {
    textareaRef.current = node
    if (typeof ref === 'function') {
      ref(node)
      return
    }
    if (ref) ref.current = node
  }
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const currentValue = value ?? internalValue
  const showClear = currentValue !== '' && currentValue != null && !disabled && !readOnly

  return (
    <div className="relative w-full">
      <textarea
        ref={setTextareaRef}
        data-slot="textarea"
        value={currentValue}
        onChange={(event) => {
          if (value === undefined) setInternalValue(event.target.value)
          onChange?.(event)
        }}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
          showClear && 'pr-8',
          className,
        )}
        {...props}
      />
      {showClear && (
        <FieldClearButton
          label="Clear textarea"
          onClear={() => {
            if (value === undefined) setInternalValue('')
            onClear?.()

            const field = textareaRef.current
            if (!field) return

            field.value = ''
            onChange?.({
              target: field,
              currentTarget: field,
            } as ChangeEvent<HTMLTextAreaElement>)
          }}
          className="absolute top-2 right-2 z-10 ml-0"
        />
      )}
    </div>
  )
})
Textarea.displayName = 'Textarea'

export function Digit({
  value,
  onChange,
  placeholder = 'Enter number',
  disabled,
  className,
  min,
  max,
  step = 1,
  ...props
}: Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'allowClear'> & {
  value?: number
  onChange?: (value: number | undefined) => void
}) {
  return (
    <Input
      {...props}
      type="number"
      value={value != null && !Number.isNaN(value) ? value : ''}
      onChange={(event) => {
        if (event.target.value === '') {
          onChange?.(undefined)
          return
        }
        const nextValue = Number(event.target.value)
        if (Number.isNaN(nextValue)) {
          onChange?.(undefined)
          return
        }
        onChange?.(nextValue)
      }}
      placeholder={placeholder}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      className={className}
      onClear={() => onChange?.(undefined)}
    />
  )
}

export function DigitRange({
  value,
  onChange,
  placeholder = ['Min', 'Max'],
  disabled,
  className,
}: {
  value?: { min?: number; max?: number }
  onChange?: (value: { min?: number; max?: number } | undefined) => void
  placeholder?: [string, string]
  disabled?: boolean
  className?: string
}) {
  const minValue = value?.min
  const maxValue = value?.max
  const hasMinValue = minValue != null && !Number.isNaN(minValue)
  const hasMaxValue = maxValue != null && !Number.isNaN(maxValue)
  const showClear = (hasMinValue || hasMaxValue) && !disabled

  function updateRange(key: 'min' | 'max', inputValue: string) {
    const parsed = Number(inputValue)
    const nextNumber = inputValue !== '' && !Number.isNaN(parsed) ? parsed : undefined
    const nextValue = {
      ...value,
      [key]: nextNumber,
    }
    if (
      (nextValue.min != null && !Number.isNaN(nextValue.min)) ||
      (nextValue.max != null && !Number.isNaN(nextValue.max))
    ) {
      onChange?.(nextValue)
      return
    }
    onChange?.(undefined)
  }

  return (
    <div
      data-slot="digit-range"
      className={cn(
        fieldShellClassName,
        'overflow-hidden [&_input]:h-auto [&_input]:w-0 [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-center [&_input]:text-base [&_input]:shadow-none [&_input]:outline-none [&_input]:selection:bg-primary [&_input]:selection:text-primary-foreground [&_input]:placeholder:text-muted-foreground [&_input]:focus-visible:ring-0 [&_input]:disabled:pointer-events-none [&_input]:disabled:cursor-not-allowed md:[&_input]:text-sm dark:[&_input]:bg-transparent',
        showClear && 'pr-0',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <input
        aria-label="Minimum value"
        type="text"
        inputMode="decimal"
        value={hasMinValue ? minValue : ''}
        onChange={(event) => updateRange('min', event.target.value)}
        placeholder={placeholder[0]}
        disabled={disabled}
      />
      <span className="shrink-0 px-2 text-muted-foreground select-none">~</span>
      <input
        aria-label="Maximum value"
        type="text"
        inputMode="decimal"
        value={hasMaxValue ? maxValue : ''}
        onChange={(event) => updateRange('max', event.target.value)}
        placeholder={placeholder[1]}
        disabled={disabled}
      />
      {showClear && (
        <FieldClearButton
          label="Clear range"
          className="ml-0"
          onClear={() => onChange?.(undefined)}
        />
      )}
    </div>
  )
}

export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  ...props
}: Omit<
  ComponentProps<typeof SliderPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange' | 'min' | 'max' | 'step' | 'disabled' | 'className'
> & {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value === undefined ? undefined : [value]}
      defaultValue={value === undefined ? [defaultValue ?? min] : undefined}
      onValueChange={(nextValue) => onChange?.(nextValue[0] ?? min)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className={
          'block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
        }
      />
    </SliderPrimitive.Root>
  )
}

export function Money({
  value,
  onChange,
  placeholder = '0.00',
  disabled,
  className,
  prefix,
  suffix,
  ...props
}: Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> & {
  value?: number
  onChange?: (value: number | undefined) => void
}) {
  return (
    <Input
      type="text"
      inputMode="decimal"
      value={value === undefined ? '' : String(value)}
      onChange={(event) => {
        const parsed = parseFloat(event.target.value.replace(/[^0-9.]/g, ''))
        if (Number.isNaN(parsed)) onChange?.(undefined)
        else onChange?.(parsed)
      }}
      placeholder={placeholder}
      disabled={disabled}
      prefix={<span className="px-3">{prefix ?? '$'}</span>}
      suffix={suffix ? <span className="px-3">{suffix}</span> : undefined}
      className={className}
      {...props}
    />
  )
}

export function Captcha({
  value,
  onChange,
  onSend,
  placeholder = 'Enter captcha',
  disabled,
  className,
  ...inputProps
}: Omit<InputProps, 'inputClassName' | 'suffix' | 'value' | 'onChange' | 'disabled'> & {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onSend?: () => void | Promise<void>
  disabled?: boolean
}) {
  const deadlineRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [remaining, setRemaining] = useState(0)

  function stopCountdown() {
    deadlineRef.current = 0
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRemaining(0)
  }

  useEffect(() => () => stopCountdown(), [])

  return (
    <Input
      autoComplete="off"
      {...inputProps}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      suffix={
        <ProButton
          variant="ghost"
          size="sm"
          disabled={disabled || remaining > 0}
          onClick={async (event) => {
            event.stopPropagation()
            await onSend?.()
            stopCountdown()
            deadlineRef.current = Date.now() + 60_000
            setRemaining(60_000)
            timerRef.current = setInterval(() => {
              const nextRemaining = Math.max(deadlineRef.current - Date.now(), 0)
              setRemaining(nextRemaining)
              if (nextRemaining === 0) stopCountdown()
            }, 250)
          }}
        >
          {remaining > 0 ? `${Math.ceil(remaining / 1000)}s` : 'Get code'}
        </ProButton>
      }
    />
  )
}
