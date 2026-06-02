'use client'

import { useState } from 'react'
import type { UploadFile, UploadProps } from './types'

export function useUploadFiles({ value, onChange }: Pick<UploadProps, 'value' | 'onChange'>) {
  const [internalValue, setInternalValue] = useState<UploadFile[]>([])
  const files = value ?? internalValue

  function setFiles(nextFiles: UploadFile[]) {
    if (value === undefined) setInternalValue(nextFiles)
    onChange?.(nextFiles)
  }

  return { files, setFiles }
}
