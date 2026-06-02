'use client'

import type { Form, IFormProps } from '@formily/core'
import { type FormEvent, useCallback, useState } from 'react'
import { useFormInstance } from './use-form-instance'

export function useProForm({
  form,
  formProps,
  submitting,
  onFinish,
  onFinishFailed,
  onReset,
}: {
  form?: Form
  formProps?: IFormProps
  submitting?: boolean
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
}) {
  const [loading, setLoading] = useState(false)
  const activeForm = useFormInstance(form, formProps)
  const isSubmitting = submitting ?? loading

  const reset = useCallback(async () => {
    await activeForm.reset()
    await onReset?.()
  }, [activeForm, onReset])

  const submit = useCallback(async () => {
    if (isSubmitting) return

    setLoading(true)
    try {
      await activeForm.validate()
      await onFinish?.(activeForm.values)
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }, [activeForm, isSubmitting, onFinish, onFinishFailed])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      void submit()
    },
    [submit],
  )

  return { activeForm, isSubmitting, reset, submit, handleSubmit }
}
