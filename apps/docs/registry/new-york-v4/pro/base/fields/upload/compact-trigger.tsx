import { Upload as UploadIcon } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  uploadCompactIconClassName,
  uploadCompactLabelClassName,
  uploadCompactPlaceholderClassName,
  uploadCompactTriggerClassName,
  uploadDraggingClassName,
} from './classes'
import type { UploadCompactTriggerProps } from './trigger-types'

export function UploadCompactTrigger({
  files,
  triggerDisabled,
  dragging,
  selectedLabel,
  onBrowse,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadCompactTriggerProps) {
  return (
    <ProButton
      type="button"
      variant="outline"
      size="default"
      aria-label="Upload files"
      disabled={triggerDisabled}
      className={cn(uploadCompactTriggerClassName, dragging && uploadDraggingClassName)}
      onClick={onBrowse}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <span
        className={cn(
          uploadCompactLabelClassName,
          !files.length && uploadCompactPlaceholderClassName,
        )}
      >
        {selectedLabel}
      </span>
      <UploadIcon className={uploadCompactIconClassName} />
    </ProButton>
  )
}
