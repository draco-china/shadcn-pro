import { ImageIcon, Upload as UploadIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '../input'
import { FieldIconButton } from '../shared/field'
import {
  uploadDraggingClassName,
  uploadInputButtonClassName,
  uploadInputButtonIconClassName,
  uploadInputClassName,
  uploadInputClassNamePlaceholderClassName,
  uploadInputDisabledClassName,
  uploadInputPreviewClassName,
  uploadInputPreviewIconClassName,
  uploadInputPreviewImageClassName,
  uploadInputRootClassName,
} from './classes'
import type { UploadInputTriggerProps } from './trigger-types'

export function UploadInputTrigger({
  firstFile,
  placeholder,
  disabled,
  triggerDisabled,
  dragging,
  preview,
  onBrowse,
  onUrlChange,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadInputTriggerProps) {
  const hasUrl = firstFile?.url !== undefined && firstFile.url.length > 0

  return (
    <fieldset
      aria-label="Upload files"
      className={uploadInputRootClassName}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Input
        type="text"
        inputMode="url"
        value={firstFile?.url ?? ''}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          uploadInputClassName,
          dragging && uploadDraggingClassName,
          triggerDisabled && uploadInputDisabledClassName,
        )}
        inputClassName={uploadInputClassNamePlaceholderClassName}
        prefix={
          preview ? (
            <div className={uploadInputPreviewClassName}>
              {hasUrl ? (
                <img src={firstFile.url} alt="" className={uploadInputPreviewImageClassName} />
              ) : (
                <ImageIcon className={uploadInputPreviewIconClassName} />
              )}
            </div>
          ) : undefined
        }
        suffix={
          <FieldIconButton
            key="upload"
            aria-label="Upload files"
            disabled={triggerDisabled}
            size="icon-xs"
            className={uploadInputButtonClassName}
            onClick={onBrowse}
          >
            <UploadIcon className={uploadInputButtonIconClassName} />
          </FieldIconButton>
        }
        allowClear={hasUrl}
        onClear={() => onUrlChange('')}
        onChange={(event) => onUrlChange(event.target.value)}
      />
    </fieldset>
  )
}
