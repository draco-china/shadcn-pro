'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { useRef } from 'react'

export function useFormInstance(form?: Form, formProps?: IFormProps) {
  const internalFormRef = useRef<Form | null>(null)

  if (!internalFormRef.current) {
    internalFormRef.current = createForm(formProps)
  }

  return form ?? internalFormRef.current
}
