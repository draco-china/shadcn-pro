'use client'

import type { ImageUploadProps } from './types'
import { Upload } from './upload'

export function ImageUpload({
  accept = 'image/*',
  presentation = 'input',
  preview = true,
  multiple = false,
  maxCount = 1,
  ...props
}: ImageUploadProps) {
  return (
    <Upload
      {...props}
      accept={accept}
      presentation={presentation}
      preview={preview}
      multiple={multiple}
      maxCount={maxCount}
    />
  )
}
