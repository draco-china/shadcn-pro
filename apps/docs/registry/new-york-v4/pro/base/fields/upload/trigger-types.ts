import type { DragEvent } from 'react'
import type { UploadFile } from './types'

interface UploadDragHandlers {
  onDragOver: (event: DragEvent<HTMLElement>) => void
  onDragLeave: () => void
  onDrop: (event: DragEvent<HTMLElement>) => void
}

export interface UploadInputTriggerProps extends UploadDragHandlers {
  firstFile?: UploadFile
  placeholder: string
  disabled?: boolean
  triggerDisabled?: boolean
  dragging?: boolean
  preview?: boolean
  onBrowse: () => void
  onUrlChange: (url: string) => void
}

export interface UploadCompactTriggerProps extends UploadDragHandlers {
  files: UploadFile[]
  triggerDisabled?: boolean
  dragging?: boolean
  selectedLabel?: string
  onBrowse: () => void
}

export interface UploadDropzoneTriggerProps extends UploadDragHandlers {
  placeholder: string
  triggerDisabled?: boolean
  reachedMax?: boolean
  dragging?: boolean
  onBrowse: () => void
}
