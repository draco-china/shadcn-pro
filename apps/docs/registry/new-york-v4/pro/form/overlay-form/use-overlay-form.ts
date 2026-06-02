'use client'

import type { Form, IFormProps } from '@formily/core'
import { useState } from 'react'
import { useFormInstance } from '../use-form-instance'

export interface UseOverlayFormOptions {
  form?: Form
  formProps?: IFormProps
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onCancel?: () => void | Promise<void>
}

export function useOverlayForm({
  form,
  formProps,
  open: controlledOpen,
  onOpenChange,
  onFinish,
  onFinishFailed,
  onCancel,
}: UseOverlayFormOptions) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const activeForm = useFormInstance(form, formProps)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  function setOpen(value: boolean) {
    if (!isControlled) setInternalOpen(value)
    onOpenChange?.(value)
  }

  async function handleSubmit() {
    if (loading) return
    setLoading(true)
    try {
      await activeForm.validate()
      await onFinish?.(activeForm.values)
      setOpen(false)
      await activeForm.reset()
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    setOpen(false)
    await activeForm.reset()
    await onCancel?.()
  }

  return { activeForm, open, setOpen, loading, handleSubmit, handleCancel }
}
