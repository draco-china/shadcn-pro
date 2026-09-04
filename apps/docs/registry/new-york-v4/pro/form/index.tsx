'use client'

import { type AnyFormApi, type FormValidateOrFn, useForm } from '@tanstack/react-form'
import { InfoIcon } from 'lucide-react'
import {
  Children,
  cloneElement,
  createContext,
  type FormEvent,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  useContext,
  useImperativeHandle,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'
import { ProDrawer, ProModal } from '../overlay'
import {
  renderSchemaField,
  type SchemaFieldValue,
  type SchemaValueField,
  type SchemaValueType,
} from './schema-render'
import {
  getControlValue,
  getErrorMessages,
  type ProFieldValidators as InternalProFieldValidators,
  withRequiredValidator,
} from './validators'

/** Validators supported by a ProForm field at each validation phase. */
export interface ProFieldValidators<TValue = unknown> extends InternalProFieldValidators<TValue> {}

type OverlayFormSubmitter =
  | ReactNode
  | ((context: { submitting: boolean; cancel: () => void | Promise<void> }) => ReactNode)

type FormValues = Record<string, unknown>

/** Imperative TanStack Form instance exposed by ProForm. */
export type ProFormInstance<TFieldValues extends FormValues = FormValues> = ReturnType<
  typeof useProForm<TFieldValues>
>

/** Form-level submit validator, including Standard Schema validators. */
export type ProFormValidator<TFieldValues extends FormValues = FormValues> =
  FormValidateOrFn<TFieldValues>

const ProFormContext = createContext<ProFormInstance | null>(null)

interface OverlayFormProps<TFieldValues extends FormValues = FormValues> {
  trigger?: ReactNode
  title: string
  description?: string
  children?: ReactNode
  schema?: ProSchemaFormItem[]
  formRef?: Ref<ProFormInstance<TFieldValues>>
  validator?: ProFormValidator<TFieldValues>
  defaultValues?: TFieldValues
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: (values: TFieldValues) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
  submitter?: false | OverlayFormSubmitter
  className?: string
}

interface ProFormProps<TFieldValues extends FormValues = FormValues> {
  children?: ReactNode
  schema?: ProSchemaFormItem[]
  formRef?: Ref<ProFormInstance<TFieldValues>>
  validator?: ProFormValidator<TFieldValues>
  defaultValues?: TFieldValues
  onFinish?: (values: TFieldValues) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
  submitter?:
    | false
    | ReactNode
    | ((context: { submitting: boolean; reset: () => void | Promise<void> }) => ReactNode)
  className?: string
}

type ProSchemaFormValue = SchemaFieldValue

/** Field state supplied to schema item render functions. */
export interface ProSchemaValueField extends SchemaValueField {}

/** Declarative field definition accepted by schema-driven forms. */
export interface ProSchemaFormItem {
  name: string
  label?: ReactNode
  valueType?: SchemaValueType
  required?: boolean
  disabled?: boolean
  hidden?: boolean
  tooltip?: ReactNode
  description?: ReactNode
  extra?: ReactNode
  errors?: string[]
  initialValue?: ProSchemaFormValue
  validators?: ProFieldValidators<ProSchemaFormValue>
  fieldProps?: Record<string, unknown>
  formItemProps?: Omit<FormItemProps, 'children' | 'label' | 'required' | 'disabled'>
  render?: (field: ProSchemaValueField, item: ProSchemaFormItem) => ReactNode
}

/** Composable TanStack Form wrapper with schema and render-prop support. */
export function ProForm<TFieldValues extends FormValues = FormValues>({
  children,
  schema,
  formRef,
  validator,
  defaultValues,
  onFinish,
  onFinishFailed,
  onReset,
  submitter,
  className,
}: ProFormProps<TFieldValues>) {
  const form = useProForm({ defaultValues, validator, onFinish, onFinishFailed })

  useImperativeHandle(formRef, () => form, [form])

  async function reset() {
    form.reset(defaultValues)
    await onReset?.()
  }

  return (
    <ProFormContext value={form as ProFormInstance}>
      <form onSubmit={submitForm(form)} className={className}>
        <div className="mb-4">
          {schema && <ProSchemaFields schema={schema} />}
          {children}
        </div>
        {submitter !== false && (
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(submitting) => (
              <div data-slot="pro-form-actions" className="flex flex-wrap items-center gap-2 pt-2">
                {renderFormSubmitter(submitter, submitting, reset)}
              </div>
            )}
          </form.Subscribe>
        )}
      </form>
    </ProFormContext>
  )
}

/** Schema-required convenience wrapper around ProForm. */
export function ProSchemaForm<TFieldValues extends FormValues = FormValues>({
  schema,
  defaultValues,
  children,
  ...props
}: Omit<ProFormProps<TFieldValues>, 'children' | 'schema'> & {
  schema: ProSchemaFormItem[]
  defaultValues?: TFieldValues
  children?: ReactNode
}) {
  return (
    <ProForm<TFieldValues> schema={schema} defaultValues={defaultValues} {...props}>
      {children}
    </ProForm>
  )
}

/** ProForm hosted inside a modal and reset after close or success. */
export function ModalForm<TFieldValues extends FormValues = FormValues>({
  trigger,
  title,
  description,
  children,
  schema,
  formRef,
  validator,
  defaultValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  className,
}: OverlayFormProps<TFieldValues>) {
  const { form, open, setOpen, handleSubmit, handleCancel } = useOverlayForm({
    formRef,
    validator,
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
      <ProFormContext value={form as ProFormInstance}>
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
              form={form as ProFormInstance}
              submitter={submitter}
              cancel={handleCancel}
              className="flex-col-reverse pt-4 sm:flex-row sm:justify-end"
            />
          )}
        </form>
      </ProFormContext>
    </ProModal>
  )
}

/** ProForm hosted inside a directional drawer. */
export function DrawerForm<TFieldValues extends FormValues = FormValues>({
  trigger,
  title,
  description,
  children,
  schema,
  formRef,
  validator,
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
  const { form, open, setOpen, handleSubmit, handleCancel } = useOverlayForm({
    formRef,
    validator,
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
      <ProFormContext value={form as ProFormInstance}>
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
              form={form as ProFormInstance}
              submitter={submitter}
              cancel={handleCancel}
              className="mt-auto flex-col p-4"
            />
          )}
        </form>
      </ProFormContext>
    </ProDrawer>
  )
}

function useOverlayForm<TFieldValues extends FormValues = FormValues>({
  formRef,
  validator,
  defaultValues,
  open: controlledOpen,
  onOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
}: {
  formRef?: Ref<ProFormInstance<TFieldValues>>
  validator?: ProFormValidator<TFieldValues>
  defaultValues?: TFieldValues
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: (values: TFieldValues) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen

  function setOpen(value: boolean) {
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }

  const form = useProForm({
    defaultValues,
    validator,
    onFinish,
    onFinishFailed,
    onSuccess: () => {
      setOpen(false)
      form.reset(defaultValues)
    },
  })
  useImperativeHandle(formRef, () => form, [form])

  async function handleCancel() {
    setOpen(false)
    form.reset(defaultValues)
    await onCancel?.()
  }

  function handleOpenChange(value: boolean) {
    setOpen(value)
    if (!value) form.reset(defaultValues)
  }

  return { form, open, setOpen: handleOpenChange, handleSubmit: submitForm(form), handleCancel }
}

function useProForm<TFieldValues extends FormValues>({
  defaultValues,
  validator,
  onFinish,
  onFinishFailed,
  onSuccess,
}: {
  defaultValues?: TFieldValues
  validator?: ProFormValidator<TFieldValues>
  onFinish?: (values: TFieldValues) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onSuccess?: () => void | Promise<void>
}) {
  return useForm({
    defaultValues: (defaultValues ?? {}) as TFieldValues,
    validators: validator ? ({ onSubmit: validator } as never) : undefined,
    onSubmit: async ({ value }) => {
      try {
        await onFinish?.(value)
        await onSuccess?.()
      } catch (error) {
        onFinishFailed?.(error)
      }
    },
    onSubmitInvalid: ({ formApi }) => onFinishFailed?.(getFormValidationErrors(formApi)),
  })
}

function getFormValidationErrors(form: AnyFormApi) {
  return {
    form: form.state.errors,
    fields: Object.fromEntries(
      Object.entries(form.state.fieldMeta).flatMap(([name, metadata]) =>
        metadata?.errors.length ? [[name, metadata.errors]] : [],
      ),
    ),
  }
}

function submitForm(form: AnyFormApi) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    void form.handleSubmit()
  }
}

function OverlayFormFooter({
  slot,
  form,
  submitter,
  cancel,
  className,
}: {
  slot: string
  form: ProFormInstance
  submitter?: OverlayFormSubmitter
  cancel: () => void | Promise<void>
  className?: string
}) {
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(submitting) => (
        <div data-slot={slot} className={cn('flex shrink-0 gap-2', className)}>
          {renderOverlaySubmitter(submitter, submitting, cancel)}
        </div>
      )}
    </form.Subscribe>
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
  validators?: ProFieldValidators
  label?: ReactNode
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  description?: ReactNode
  tooltip?: ReactNode
  errors?: string[]
  extra?: ReactNode
}

/** Binds one child control to the nearest ProForm field context. */
export function FormItem({
  className,
  children,
  name,
  bind = true,
  validators,
  label,
  required,
  disabled,
  htmlFor,
  description,
  tooltip,
  errors = [],
  extra,
}: FormItemProps) {
  const form = useContext(ProFormContext)
  const shouldBind = bind && name && form && isValidElement(children)

  if (!shouldBind) {
    return (
      <FormItemContent
        className={className}
        label={label}
        required={required}
        disabled={disabled}
        htmlFor={htmlFor}
        description={description}
        tooltip={tooltip}
        errors={errors}
        extra={extra}
      >
        {children}
      </FormItemContent>
    )
  }

  return (
    <form.Field
      name={name as never}
      validators={withRequiredValidator(required, validators) as never}
    >
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        const hasErrors = errors.length > 0
        return (
          <FormItemContent
            className={className}
            label={label}
            required={required}
            disabled={disabled}
            htmlFor={htmlFor ?? name}
            description={description}
            tooltip={tooltip}
            errors={hasErrors ? errors : isInvalid ? getErrorMessages(field.state.meta.errors) : []}
            extra={extra}
          >
            {cloneElement(Children.only(children) as ReactElement<Record<string, unknown>>, {
              id: htmlFor ?? name,
              name: field.name,
              value: field.state.value,
              disabled: disabled || undefined,
              required: required || undefined,
              'aria-invalid': hasErrors || isInvalid,
              onBlur: field.handleBlur,
              onChange: (value: unknown) =>
                (field.handleChange as (nextValue: unknown) => void)(getControlValue(value)),
            })}
          </FormItemContent>
        )
      }}
    </form.Field>
  )
}

function FormItemContent({
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
}: Omit<FormItemProps, 'name' | 'bind' | 'validators'>) {
  return (
    <div
      className={cn('flex flex-col gap-1.5', className)}
      data-invalid={errors.length > 0 || undefined}
      data-disabled={disabled || undefined}
    >
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

function ProSchemaFields({ schema }: { schema: ProSchemaFormItem[] }) {
  const form = useContext(ProFormContext)
  if (!form) throw new Error('ProSchemaFields must be rendered inside ProForm.')

  return (
    <div className="flex flex-col gap-4">
      {schema.map((item) => {
        if (item.hidden) return null

        return (
          <form.Field
            key={String(item.name)}
            name={item.name as never}
            defaultValue={item.initialValue as never}
            validators={withRequiredValidator(item.required, item.validators) as never}
          >
            {(field) => {
              const validationErrors =
                field.state.meta.isTouched && !field.state.meta.isValid
                  ? getErrorMessages(field.state.meta.errors)
                  : []
              const fieldErrors = item.errors?.length ? item.errors : validationErrors
              const valueField: ProSchemaValueField = {
                name: field.name,
                value: field.state.value as ProSchemaFormValue,
                invalid: fieldErrors.length > 0,
                onChange: (value) =>
                  (field.handleChange as (nextValue: ProSchemaFormValue) => void)(value),
                onBlur: field.handleBlur,
              }
              return (
                <FormItem
                  name={item.name}
                  bind={false}
                  label={item.label}
                  required={item.required}
                  disabled={item.disabled}
                  htmlFor={String(item.name)}
                  description={item.description}
                  tooltip={item.tooltip}
                  errors={fieldErrors}
                  extra={item.extra}
                  {...item.formItemProps}
                >
                  {item.render
                    ? item.render(valueField, item)
                    : renderSchemaField(item, valueField)}
                </FormItem>
              )
            }}
          </form.Field>
        )
      })}
    </div>
  )
}
