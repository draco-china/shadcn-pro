'use client'

import { InfoIcon } from 'lucide-react'
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  useImperativeHandle,
  useState,
} from 'react'
import {
  Controller,
  type DefaultValues,
  type FieldErrors,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  FormProvider,
  type RefCallBack,
  type RegisterOptions,
  type Resolver,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
  useForm,
  useFormContext,
} from 'react-hook-form'
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

export type ProFormInstance<TFieldValues extends FieldValues = FieldValues> =
  UseFormReturn<TFieldValues>

interface OverlayFormProps<TFieldValues extends FieldValues = FieldValues> {
  trigger?: ReactNode
  title: string
  description?: string
  children?: ReactNode
  schema?: ProSchemaFormItem[]
  formRef?: Ref<ProFormInstance<TFieldValues>>
  form?: UseFormReturn<TFieldValues>
  resolver?: Resolver<TFieldValues>
  defaultValues?: DefaultValues<TFieldValues>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: SubmitHandler<TFieldValues>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
  submitter?: false | OverlayFormSubmitter
  className?: string
}

interface ProFormProps<TFieldValues extends FieldValues = FieldValues> {
  children?: ReactNode
  schema?: ProSchemaFormItem[]
  formRef?: Ref<ProFormInstance<TFieldValues>>
  form?: UseFormReturn<TFieldValues>
  resolver?: Resolver<TFieldValues>
  defaultValues?: DefaultValues<TFieldValues>
  onFinish?: SubmitHandler<TFieldValues>
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

export interface ProSchemaValueField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  value: FieldPathValue<TFieldValues, TName>
  onChange: (value: ProSchemaFormValue) => void
  onBlur: () => void
  ref: RefCallBack
}

export interface ProSchemaFormItem<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
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
  rules?: RegisterOptions<TFieldValues, TName>
  fieldProps?: Record<string, unknown>
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'required' | 'disabled'>
  render?: (
    field: ProSchemaValueField<TFieldValues, TName>,
    item: ProSchemaFormItem<TFieldValues, TName>,
  ) => ReactNode
}

export function ProForm<TFieldValues extends FieldValues = FieldValues>({
  children,
  schema,
  formRef,
  form: formProp,
  resolver,
  defaultValues,
  onFinish,
  onFinishFailed,
  onReset,
  submitter,
  className,
}: ProFormProps<TFieldValues>) {
  const internalForm = useForm<TFieldValues>({ resolver, defaultValues })
  const form = formProp ?? internalForm
  const [loading, setLoading] = useState(false)

  useImperativeHandle(formRef, () => form, [form])

  async function reset() {
    form.reset(defaultValues)
    await onReset?.()
  }

  const submitHandler = form.handleSubmit(
    async (values) => {
      if (loading) return

      setLoading(true)
      try {
        await onFinish?.(values)
      } catch (err) {
        onFinishFailed?.(err)
      } finally {
        setLoading(false)
      }
    },
    onFinishFailed as SubmitErrorHandler<TFieldValues>,
  )

  return (
    <FormProvider {...form}>
      <form onSubmit={submitHandler} className={className}>
        <div className="mb-4">
          {schema && <ProSchemaFields schema={schema} />}
          {children}
        </div>
        {submitter !== false && (
          <div data-slot="pro-form-actions" className="flex flex-wrap items-center gap-2 pt-2">
            {renderFormSubmitter(submitter, loading, reset)}
          </div>
        )}
      </form>
    </FormProvider>
  )
}

export function ProSchemaForm<TFieldValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  children,
  ...props
}: Omit<ProFormProps<TFieldValues>, 'children' | 'schema'> & {
  schema: ProSchemaFormItem[]
  defaultValues?: DefaultValues<TFieldValues>
  children?: ReactNode
}) {
  return (
    <ProForm<TFieldValues> schema={schema} defaultValues={defaultValues} {...props}>
      {children}
    </ProForm>
  )
}

export function ModalForm<TFieldValues extends FieldValues = FieldValues>({
  trigger,
  title,
  description,
  children,
  schema,
  formRef,
  form: formProp,
  resolver,
  defaultValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  className,
}: OverlayFormProps<TFieldValues>) {
  const { form, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    form: formProp,
    formRef,
    resolver,
    defaultValues,
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
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit}
          className={cn('flex flex-1 flex-col overflow-hidden', className)}
        >
          <div className="flex-1 overflow-y-auto px-1 py-2">
            {schema && <ProSchemaFields schema={schema} />}
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
      </FormProvider>
    </ProModal>
  )
}

export function DrawerForm<TFieldValues extends FieldValues = FieldValues>({
  trigger,
  title,
  description,
  children,
  schema,
  formRef,
  form: formProp,
  resolver,
  defaultValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  className,
  side = 'right',
}: OverlayFormProps<TFieldValues> & { side?: 'top' | 'right' | 'bottom' | 'left' }) {
  const { form, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    form: formProp,
    formRef,
    resolver,
    defaultValues,
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
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit}
          className={cn('flex flex-1 flex-col overflow-hidden', className)}
        >
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {schema && <ProSchemaFields schema={schema} />}
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
      </FormProvider>
    </ProDrawer>
  )
}

function useOverlayForm<TFieldValues extends FieldValues = FieldValues>({
  form: formProp,
  formRef,
  resolver,
  defaultValues,
  open: controlledOpen,
  onOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
}: {
  form?: UseFormReturn<TFieldValues>
  formRef?: Ref<ProFormInstance<TFieldValues>>
  resolver?: Resolver<TFieldValues>
  defaultValues?: DefaultValues<TFieldValues>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: SubmitHandler<TFieldValues>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
}) {
  const internalForm = useForm<TFieldValues>({ resolver, defaultValues })
  const form = formProp ?? internalForm
  const [internalOpen, setInternalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const open = controlledOpen ?? internalOpen

  useImperativeHandle(formRef, () => form, [form])

  function setOpen(value: boolean) {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }

  const handleSubmit = form.handleSubmit(
    async (values) => {
      if (loading) return
      setLoading(true)
      try {
        await onFinish?.(values)
        setOpen(false)
        form.reset(defaultValues)
      } catch (err) {
        onFinishFailed?.(err)
      } finally {
        setLoading(false)
      }
    },
    onFinishFailed as SubmitErrorHandler<TFieldValues>,
  )

  async function handleCancel() {
    setOpen(false)
    form.reset(defaultValues)
    await onCancel?.()
  }

  return { form, open, setOpen, loading, handleSubmit, handleCancel }
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
      {renderOverlaySubmitter(submitter, submitting, cancel)}
    </div>
  )
}

function renderFormSubmitter(
  submitter: ProFormProps['submitter'],
  submitting: boolean,
  reset: () => void | Promise<void>,
) {
  if (typeof submitter === 'function') return submitter({ submitting, reset })
  if (submitter !== undefined && submitter !== null && submitter !== false) return submitter
  return (
    <ProButton type="submit" loading={submitting}>
      {submitting ? 'Submitting...' : 'Submit'}
    </ProButton>
  )
}

function renderOverlaySubmitter(
  submitter: OverlayFormSubmitter | undefined,
  submitting: boolean,
  cancel: () => void | Promise<void>,
) {
  if (typeof submitter === 'function') return submitter({ submitting, cancel })
  if (submitter !== undefined && submitter !== null) return submitter
  return (
    <>
      <ProButton variant="outline" disabled={submitting} onClick={cancel}>
        Cancel
      </ProButton>
      <ProButton type="submit" loading={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </ProButton>
    </>
  )
}

interface FormItemProps {
  className?: string
  children?: ReactNode
  name?: string
  bind?: boolean
  rules?: RegisterOptions<FieldValues, string>
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
  name,
  bind = true,
  rules,
  label,
  required,
  disabled,
  htmlFor,
  description,
  tooltip,
  errors = [],
  extra,
}: FormItemProps) {
  const fieldError = useFieldErrors(name ?? htmlFor)
  const errorMessages = errors.length > 0 ? errors : fieldError
  const control = useOptionalFormControl()
  const shouldBind = bind && name && control && isValidElement(children)

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
              className="cursor-help"
            >
              <InfoIcon />
            </ProButton>
          )}
          {required && (
            <span className="text-sm leading-5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </div>
      )}
      {shouldBind ? (
        <Controller
          name={name}
          control={control}
          rules={{
            ...(required ? { required: 'This field is required.' } : {}),
            ...rules,
          }}
          render={({ field }) =>
            cloneElement(Children.only(children) as ReactElement<Record<string, unknown>>, {
              id: htmlFor ?? name,
              name: field.name,
              value: field.value,
              onBlur: field.onBlur,
              onChange: field.onChange,
              ref: field.ref,
            })
          }
        />
      ) : (
        children
      )}
      {errorMessages.length > 0 && (
        <p className="text-xs text-destructive" role="alert">
          {errorMessages.join(', ')}
        </p>
      )}
      {extra != null && <div className="text-xs text-muted-foreground">{extra}</div>}
    </div>
  )
}

function useOptionalFormControl() {
  try {
    return useFormContext().control
  } catch {
    return undefined
  }
}

function ProSchemaFields({ schema }: { schema: ProSchemaFormItem[] }) {
  return (
    <div className="space-y-4">
      {schema.map((item) => {
        if (item.hidden) return null

        return (
          <Controller
            key={item.name}
            name={item.name}
            defaultValue={item.initialValue}
            rules={{
              ...(item.required ? { required: 'This field is required.' } : {}),
              ...item.rules,
            }}
            render={({ field }) => (
              <FormItem
                name={item.name}
                bind={false}
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
                {item.render
                  ? item.render(field as ProSchemaValueField, item)
                  : renderSchemaField(item, field as ProSchemaValueField)}
              </FormItem>
            )}
          />
        )
      })}
    </div>
  )
}

function useFieldErrors(name?: string) {
  try {
    const { formState } = useFormContext()
    const error = name ? getFieldError(formState.errors, name) : undefined
    if (!error) return []
    if (error.types && typeof error.types === 'object')
      return Object.values(error.types).map(String)
    return error.message ? [String(error.message)] : []
  } catch {
    return []
  }
}

function getFieldError(
  errors: FieldErrors<FieldValues>,
  name: string,
): { message?: unknown; types?: Record<string, unknown> } | undefined {
  const error = name.split('.').reduce<unknown>((current, key) => {
    if (current == null || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[key]
  }, errors) as { message?: unknown; types?: unknown } | undefined

  if (!error) return undefined
  return {
    message: error.message,
    types:
      error.types && typeof error.types === 'object'
        ? (error.types as Record<string, unknown>)
        : undefined,
  }
}

function renderSchemaField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(item: ProSchemaFormItem<TFieldValues, TName>, field: ProSchemaValueField<TFieldValues, TName>) {
  const fieldProps = item.fieldProps ?? {}
  const value = field.value as ProSchemaFormValue
  const textValue = String(value ?? '')
  const dateValue = value instanceof Date ? value : undefined
  const stringValue = typeof value === 'string' ? value : undefined
  const numberValue = typeof value === 'number' ? value : undefined

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
          value={value as string | string[] | undefined}
          disabled={item.disabled}
          required={item.required}
          onChange={field.onChange}
          {...fieldProps}
        />
      )
    case 'multiSelect':
      return (
        <Select
          value={value as string | string[] | undefined}
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
          value={value as boolean | string[] | undefined}
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
          value={value as { from?: Date; to?: Date } | undefined}
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
