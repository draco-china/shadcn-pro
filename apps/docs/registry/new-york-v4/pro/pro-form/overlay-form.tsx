'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { FormProvider, type SchemaReactComponents } from '@formily/react'
import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import {
  getProFormRootSectionProps,
  ProFormActions,
  type ProFormActionsProps,
  ProFormSection,
} from './layout'
import { createSchemaFieldWithComponents, type ProFormSchema } from './schema'

// ─── Shared types ──────────────────────────────────────────────────────────────

interface OverlayFormProps {
  /** The element that opens the form (e.g. a Button) */
  trigger?: React.ReactNode
  /** Dialog / Drawer title */
  title: string
  /** Dialog / Drawer description */
  description?: string
  /** Form contents */
  children?: React.ReactNode
  schema?: ProFormSchema
  schemaComponents?: SchemaReactComponents
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Called after validation passes — return/resolve to close, throw to keep open */
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
  submitter?: false | OverlayFormSubmitterProps
  /** Formily Form instance (created internally if not provided) */
  form?: Form
  formProps?: IFormProps
  /** Column layout shortcut */
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export interface OverlayFormSubmitterContext {
  form: Form
  submitting: boolean
  submit: () => void | Promise<void>
  cancel: () => void | Promise<void>
}

export interface OverlayFormSubmitterProps extends ProFormActionsProps {}

const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

// ─── Shared hook ──────────────────────────────────────────────────────────────

function useOverlayForm({
  form,
  formProps,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
}: Pick<
  OverlayFormProps,
  'form' | 'formProps' | 'open' | 'onOpenChange' | 'onFinish' | 'onFinishFailed' | 'onCancel'
>) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const internalFormRef = React.useRef<Form | null>(null)

  if (!internalFormRef.current) {
    internalFormRef.current = createForm(formProps)
  }

  const activeForm = form ?? internalFormRef.current
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  function setOpen(value: boolean) {
    if (!isControlled) setInternalOpen(value)
    controlledOnOpenChange?.(value)
  }

  async function handleSubmit() {
    if (loading) return
    setLoading(true)
    try {
      await activeForm.validate()
      await onFinish?.(activeForm.values)
      setOpen(false)
      activeForm.reset()
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    setOpen(false)
    activeForm.reset()
    await onCancel?.()
  }

  return { activeForm, open, setOpen, loading, handleSubmit, handleCancel }
}

// ─── ModalForm ────────────────────────────────────────────────────────────────

export interface ModalFormProps extends OverlayFormProps {
  /** Dialog width class (default: sm:max-w-lg) */
  widthClass?: string
}

export function ModalForm({
  trigger,
  title,
  description,
  children,
  schema,
  schemaComponents,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  form,
  formProps,
  columns,
  className,
  widthClass = 'sm:max-w-lg',
}: ModalFormProps) {
  const { activeForm, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    form,
    formProps,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onFinish,
    onFinishFailed,
    onCancel: getSubmitterCancelHandler(submitter) ?? onCancel,
  })
  const actions = renderOverlaySubmitter({
    loading,
    submitter,
    onCancel: handleCancel,
  })
  const ActiveSchemaField = React.useMemo(
    () => createSchemaFieldWithComponents(schemaComponents),
    [schemaComponents],
  )
  const formContent = (
    <>
      {schema && <ActiveSchemaField schema={schema} />}
      {children}
    </>
  )

  const body = renderOverlayBody(formContent, schema, columns)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn(widthClass, 'flex max-h-[90vh] flex-col')}>
        <DialogHeader className="shrink-0">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FormProvider form={activeForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className={cn('flex flex-1 flex-col overflow-hidden', className)}
          >
            <div className="flex-1 overflow-y-auto px-1 py-2">{body}</div>
            {actions && <DialogFooter className="shrink-0 pt-4">{actions}</DialogFooter>}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}

// ─── DrawerForm ───────────────────────────────────────────────────────────────

export interface DrawerFormProps extends OverlayFormProps {
  /** Drawer side (default: right) */
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function DrawerForm({
  trigger,
  title,
  description,
  children,
  schema,
  schemaComponents,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
  submitter,
  form,
  formProps,
  columns,
  className,
  side = 'right',
}: DrawerFormProps) {
  const { activeForm, open, setOpen, loading, handleSubmit, handleCancel } = useOverlayForm({
    form,
    formProps,
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    onFinish,
    onFinishFailed,
    onCancel: getSubmitterCancelHandler(submitter) ?? onCancel,
  })
  const actions = renderOverlaySubmitter({
    loading,
    submitter,
    onCancel: handleCancel,
  })
  const ActiveSchemaField = React.useMemo(
    () => createSchemaFieldWithComponents(schemaComponents),
    [schemaComponents],
  )
  const formContent = (
    <>
      {schema && <ActiveSchemaField schema={schema} />}
      {children}
    </>
  )

  const body = renderOverlayBody(formContent, schema, columns)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={side}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="shrink-0">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <FormProvider form={activeForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className={cn('flex flex-1 flex-col overflow-hidden', className)}
          >
            <div className="flex-1 overflow-y-auto px-4 py-2">{body}</div>
            {actions && <DrawerFooter className="shrink-0">{actions}</DrawerFooter>}
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}

function renderOverlaySubmitter({
  loading,
  submitter,
  onCancel,
}: {
  loading: boolean
  submitter?: false | OverlayFormSubmitterProps
  onCancel: () => void | Promise<void>
}) {
  if (submitter === false) return null

  const submitterActions = submitter ?? {}
  const submitting = submitterActions.submitting ?? loading
  const cancelOptions = submitterActions.cancel
  const cancel =
    cancelOptions === false
      ? false
      : {
          text: 'Cancel',
          ...cancelOptions,
          onClick: onCancel,
        }
  return (
    <ProFormActions
      {...submitterActions}
      cancel={cancel}
      submitting={submitting}
      className={cn('w-full justify-end', submitterActions.className)}
    />
  )
}

function renderOverlayBody(
  content: React.ReactNode,
  schema?: ProFormSchema,
  columns?: 1 | 2 | 3 | 4,
) {
  const rootSectionProps = getProFormRootSectionProps(schema)

  if (rootSectionProps) {
    return (
      <ProFormSection {...rootSectionProps} columns={rootSectionProps.columns ?? columns}>
        {content}
      </ProFormSection>
    )
  }

  const bodyClassName = cn('grid gap-4', columns ? colsClass[columns] : 'grid-cols-1')

  return <div className={bodyClassName}>{content}</div>
}

function getSubmitterCancelHandler(submitter: false | OverlayFormSubmitterProps | undefined) {
  if (submitter === false || submitter === undefined) return undefined
  const cancel = submitter.cancel
  if (cancel === false || cancel === undefined) return undefined
  return cancel.onClick
}
