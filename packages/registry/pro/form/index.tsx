'use client'

import { InfoIcon } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'
import { Checkbox, Switch } from '../base/fields/checkbox'
import { DatePicker, DateRangePicker } from '../base/fields/date-picker'
import { DateTimePicker, TimePicker } from '../base/fields/date-time-picker'
import { Input, Password, Slider, Textarea } from '../base/fields/input'
import { Radio, Rate, Segmented } from '../base/fields/radio'
import { Select } from '../base/fields/select'
import { ProDrawer, ProModal } from '../overlay'

type OverlayFormSubmitter =
  | ReactNode
  | ((context: { submitting: boolean; cancel: () => void | Promise<void> }) => ReactNode)

interface OverlayFormProps {
  trigger?: ReactNode
  title: string
  description?: string
  children?: ReactNode
  schema?: ProSchemaFormItem[]
  initialValues?: ProSchemaFormValues
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
  submitter?: false | OverlayFormSubmitter
  className?: string
}

interface ProFormProps {
  children?: ReactNode
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
  submitter?:
    | false
    | ReactNode
    | ((context: { submitting: boolean; reset: () => void | Promise<void> }) => ReactNode)
  className?: string
}

type ProSchemaFormValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | { from?: Date; to?: Date }
  | undefined
  | null

type ProSchemaFormValues = Record<string, ProSchemaFormValue>

type ProSchemaValueField = {
  value: ProSchemaFormValue
  onChange: (value: ProSchemaFormValue) => void
}

type ProSchemaFormItem = {
  name: string
  label?: ReactNode
  valueType?:
    | 'text'
    | 'email'
    | 'password'
    | 'textarea'
    | 'select'
    | 'multiSelect'
    | 'checkbox'
    | 'radio'
    | 'switch'
    | 'date'
    | 'dateRange'
    | 'dateTime'
    | 'time'
    | 'slider'
    | 'rate'
    | 'segmented'
  required?: boolean
  disabled?: boolean
  hidden?: boolean
  tooltip?: ReactNode
  description?: ReactNode
  extra?: ReactNode
  errors?: string[]
  initialValue?: ProSchemaFormValue
  fieldProps?: Record<string, unknown>
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'required' | 'disabled'>
  render?: (field: ProSchemaValueField, item: ProSchemaFormItem) => ReactNode
}

export function ProForm({
  children,
  onFinish,
  onFinishFailed,
  onReset,
  submitter,
  className,
}: ProFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  async function reset() {
    formRef.current?.reset()
    await onReset?.()
  }

  async function submit() {
    if (loading) return

    setLoading(true)
    try {
      await onFinish?.(getFormValues(formRef.current))
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault()
        void submit()
      }}
      className={className}
    >
      <div className="mb-4">{children}</div>
      {submitter !== false && (
        <div data-slot="pro-form-actions" className="flex flex-wrap items-center gap-2 pt-2">
          {typeof submitter === 'function'
            ? submitter({ submitting: loading, reset })
            : (submitter ?? (
                <ProButton type="submit" loading={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </ProButton>
              ))}
        </div>
      )}
    </form>
  )
}

export function ProSchemaForm({
  schema,
  initialValues,
  children,
  ...props
}: Omit<ProFormProps, 'children'> & {
  schema: ProSchemaFormItem[]
  initialValues?: ProSchemaFormValues
  children?: ReactNode
}) {
  return (
    <ProForm {...props}>
      <ProSchemaFields schema={schema} initialValues={initialValues} />
      {children}
    </ProForm>
  )
}

export function ModalForm({
  trigger,
  title,
  description,
  children,
  schema,
  initialValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  className,
}: OverlayFormProps) {
  const { formRef, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onFinish,
    onFinishFailed,
    onCancel,
  })

  return (
    <ProModal
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
    >
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit()
        }}
        className={cn('flex flex-1 flex-col overflow-hidden', className)}
      >
        <div className="flex-1 overflow-y-auto px-1 py-2">
          {schema && <ProSchemaFields schema={schema} initialValues={initialValues} />}
          {children}
        </div>
        {submitter !== false && (
          <OverlayFormFooter
            slot="modal-form-footer"
            submitter={submitter}
            submitting={loading}
            cancel={handleCancel}
            className="flex-col-reverse pt-4 sm:flex-row sm:justify-end"
          />
        )}
      </form>
    </ProModal>
  )
}

export function DrawerForm({
  trigger,
  title,
  description,
  children,
  schema,
  initialValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  className,
  side = 'right',
}: OverlayFormProps & { side?: 'top' | 'right' | 'bottom' | 'left' }) {
  const { formRef, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onFinish,
    onFinishFailed,
    onCancel,
  })

  return (
    <ProDrawer
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      side={side}
    >
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit()
        }}
        className={cn('flex flex-1 flex-col overflow-hidden', className)}
      >
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {schema && <ProSchemaFields schema={schema} initialValues={initialValues} />}
          {children}
        </div>
        {submitter !== false && (
          <OverlayFormFooter
            slot="drawer-form-footer"
            submitter={submitter}
            submitting={loading}
            cancel={handleCancel}
            className="mt-auto flex-col p-4"
          />
        )}
      </form>
    </ProDrawer>
  )
}

function useOverlayForm({
  open: controlledOpen,
  onOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [internalOpen, setInternalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const open = controlledOpen ?? internalOpen

  function setOpen(value: boolean) {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }

  async function handleSubmit() {
    if (loading) return
    setLoading(true)
    try {
      await onFinish?.(getFormValues(formRef.current))
      setOpen(false)
      formRef.current?.reset()
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    setOpen(false)
    formRef.current?.reset()
    await onCancel?.()
  }

  return { formRef, open, setOpen, loading, handleSubmit, handleCancel }
}

function OverlayFormFooter({
  slot,
  submitter,
  submitting,
  cancel,
  className,
}: {
  slot: string
  submitter?: OverlayFormSubmitter
  submitting: boolean
  cancel: () => void | Promise<void>
  className?: string
}) {
  return (
    <div data-slot={slot} className={cn('flex shrink-0 gap-2', className)}>
      {typeof submitter === 'function'
        ? submitter({ submitting, cancel })
        : (submitter ?? (
            <>
              <ProButton variant="outline" disabled={submitting} onClick={cancel}>
                Cancel
              </ProButton>
              <ProButton type="submit" loading={submitting}>
                {submitting ? 'Submitting...' : 'Submit'}
              </ProButton>
            </>
          ))}
    </div>
  )
}

function getFormValues(form: HTMLFormElement | null) {
  if (!form) return {}

  const values: Record<string, unknown> = {}
  for (const [key, value] of new FormData(form).entries()) {
    const currentValue = values[key]
    values[key] =
      currentValue === undefined
        ? value
        : Array.isArray(currentValue)
          ? [...currentValue, value]
          : [currentValue, value]
  }
  return values
}

interface FormItemProps {
  className?: string
  children?: ReactNode
  label?: ReactNode
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  description?: ReactNode
  tooltip?: ReactNode
  errors?: string[]
  extra?: ReactNode
}

export function FormItem({
  className,
  children,
  label,
  required,
  disabled,
  htmlFor,
  description,
  tooltip,
  errors = [],
  extra,
}: FormItemProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label != null && (
        <div className="flex items-center gap-1.5">
          <label
            htmlFor={htmlFor}
            className={cn(
              'flex items-center gap-2 text-sm leading-5 font-medium select-none',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {label}
          </label>
          {(tooltip ?? description) != null && (
            <ProButton
              variant="ghost"
              size="icon-xs"
              tooltip={tooltip ?? description}
              className="size-4 cursor-help text-muted-foreground hover:text-foreground"
            >
              <InfoIcon className="size-3.5" />
            </ProButton>
          )}
          {required && (
            <span className="text-sm leading-5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </div>
      )}
      {children}
      {errors.length > 0 && (
        <p className="text-xs text-destructive" role="alert">
          {errors.join(', ')}
        </p>
      )}
      {extra != null && <div className="text-xs text-muted-foreground">{extra}</div>}
    </div>
  )
}

function ProSchemaFields({
  schema,
  initialValues,
}: {
  schema: ProSchemaFormItem[]
  initialValues?: ProSchemaFormValues
}) {
  const [values, setValues] = useState<ProSchemaFormValues>(() =>
    Object.fromEntries(
      schema.map((item) => [item.name, initialValues?.[item.name] ?? item.initialValue]),
    ),
  )

  return (
    <div className="space-y-4">
      {schema.map((item) => {
        if (item.hidden) return null

        const field = {
          value: values[item.name],
          onChange: (nextValue: ProSchemaFormValue) =>
            setValues((current) => ({ ...current, [item.name]: nextValue })),
        }
        const hiddenValues = Array.isArray(field.value)
          ? field.value
          : field.value instanceof Date
            ? [field.value.toISOString()]
            : typeof field.value === 'object' && field.value != null
              ? [
                  JSON.stringify({
                    from: field.value.from?.toISOString(),
                    to: field.value.to?.toISOString(),
                  }),
                ]
              : field.value != null
                ? [String(field.value)]
                : []

        return (
          <FormItem
            key={item.name}
            label={item.label}
            required={item.required}
            disabled={item.disabled}
            htmlFor={item.name}
            description={item.description}
            tooltip={item.tooltip}
            errors={item.errors}
            extra={item.extra}
            {...item.formItemProps}
          >
            {item.render ? item.render(field, item) : renderSchemaField(item, field)}
            {hiddenValues.map((fieldValue) => (
              <input
                key={`${item.name}-${fieldValue}`}
                type="hidden"
                name={item.name}
                value={fieldValue}
              />
            ))}
          </FormItem>
        )
      })}
    </div>
  )
}

function renderSchemaField(item: ProSchemaFormItem, field: ProSchemaValueField) {
  const fieldProps = item.fieldProps ?? {}
  const textValue = String(field.value ?? '')
  const dateValue = field.value instanceof Date ? field.value : undefined
  const stringValue = typeof field.value === 'string' ? field.value : undefined
  const numberValue = typeof field.value === 'number' ? field.value : undefined

  switch (item.valueType ?? 'text') {
    case 'password':
      return (
        <Password
          id={item.name}
          value={textValue}
          disabled={item.disabled}
          required={item.required}
          onChange={(event) => field.onChange(event.target.value)}
          {...fieldProps}
        />
      )
    case 'textarea':
      return (
        <Textarea
          id={item.name}
          value={textValue}
          disabled={item.disabled}
          required={item.required}
          onChange={(event) => field.onChange(event.target.value)}
          {...fieldProps}
        />
      )
    case 'select':
      return (
        <Select
          value={field.value as string | string[] | undefined}
          disabled={item.disabled}
          required={item.required}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'multiSelect':
      return (
        <Select
          value={field.value as string | string[] | undefined}
          disabled={item.disabled}
          required={item.required}
          multiple
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          value={field.value as boolean | string[] | undefined}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'radio':
      return (
        <Radio
          name={item.name}
          value={stringValue}
          disabled={item.disabled}
          required={item.required}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'switch':
      return (
        <Switch
          value={Boolean(field.value)}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'date':
      return (
        <DatePicker
          value={dateValue}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'dateRange':
      return (
        <DateRangePicker
          value={field.value as { from?: Date; to?: Date } | undefined}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'dateTime':
      return (
        <DateTimePicker
          value={dateValue}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'time':
      return (
        <TimePicker
          value={stringValue}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'slider':
      return (
        <Slider
          value={numberValue}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'rate':
      return (
        <Rate
          value={numberValue ?? 0}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'segmented':
      return (
        <Segmented
          value={stringValue}
          disabled={item.disabled}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
  }

  return (
    <Input
      id={item.name}
      type={item.valueType === 'email' ? 'email' : 'text'}
      value={textValue}
      disabled={item.disabled}
      required={item.required}
      onChange={(event) => field.onChange(event.target.value)}
      {...fieldProps}
    />
  )
}
