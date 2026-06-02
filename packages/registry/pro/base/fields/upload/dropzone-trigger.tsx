import { Upload as UploadIcon } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  uploadDraggingClassName,
  uploadDropzoneIconClassName,
  uploadDropzoneInteractiveClassName,
  uploadDropzoneTriggerClassName,
} from './classes'
import type { UploadDropzoneTriggerProps } from './trigger-types'

export function UploadDropzoneTrigger({
  placeholder,
  triggerDisabled,
  reachedMax,
  dragging,
  onBrowse,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadDropzoneTriggerProps) {
  if (reachedMax) return null

  return (
    <ProButton
      type="button"
      variant="outline"
      aria-label="Upload files"
      disabled={triggerDisabled}
      className={cn(
        uploadDropzoneTriggerClassName,
        dragging && uploadDraggingClassName,
        !triggerDisabled && uploadDropzoneInteractiveClassName,
      )}
      onClick={onBrowse}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <UploadIcon className={uploadDropzoneIconClassName} />
      <span>{placeholder}</span>
    </ProButton>
  )
}
