'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { FormProvider } from '@formily/react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
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
import { ProFormGrid } from './layout'

// ─── Shared types ──────────────────────────────────────────────────────────────

interface OverlayFormProps {
  /** The element that opens the form (e.g. a Button) */
  trigger: React.ReactNode
  /** Dialog / Drawer title */
  title: string
  /** Dialog / Drawer description */
  description?: string
  /** Form contents */
  children?: React.ReactNode
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Called after validation passes — return/resolve to close, throw to keep open */
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  /** Submit button label */
  submitText?: string
  /** Cancel button label */
  cancelText?: string
  /** Formily Form instance (created internally if not provided) */
  form?: Form
  formProps?: IFormProps
  /** Column layout shortcut */
  columns?: 1 | 2 | 3 | 4
  className?: string
}

// ─── Shared hook ──────────────────────────────────────────────────────────────

function useOverlayForm({
  form,
  formProps,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
}: Pick<
  OverlayFormProps,
  'form' | 'formProps' | 'open' | 'onOpenChange' | 'onFinish' | 'onFinishFailed'
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

  function handleCancel() {
    setOpen(false)
    activeForm.reset()
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
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  submitText = 'Submit',
  cancelText = 'Cancel',
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
  })

  const body = columns ? (
    <ProFormGrid columns={columns}>{children}</ProFormGrid>
  ) : (
    <div className="space-y-4">{children}</div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(widthClass, 'flex flex-col max-h-[90vh]')}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FormProvider form={activeForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className={className}
          >
            <div className="flex-1 overflow-y-auto px-1 py-2">{body}</div>
            <DialogFooter className="shrink-0 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                {cancelText}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting…' : submitText}
              </Button>
            </DialogFooter>
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
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onFinish,
  onFinishFailed,
  submitText = 'Submit',
  cancelText = 'Cancel',
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
  })

  const body = columns ? (
    <ProFormGrid columns={columns}>{children}</ProFormGrid>
  ) : (
    <div className="space-y-4">{children}</div>
  )

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={side}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
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
            className={cn('flex flex-col flex-1 overflow-hidden', className)}
          >
            <div className="flex-1 overflow-y-auto px-4 py-2">{body}</div>
            <DrawerFooter className="shrink-0">
              <Button type="submit" disabled={loading}>
                {loading ? 'Submitting…' : submitText}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                {cancelText}
              </Button>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  )
}
