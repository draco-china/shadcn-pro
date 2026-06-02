'use client'

import { cn } from '@/lib/utils'
import { uploadNativeInputClassName, uploadRootClassName } from './classes'
import { UploadCompactTrigger } from './compact-trigger'
import { UploadDropzoneTrigger } from './dropzone-trigger'
import { UploadFileList } from './file-list'
import { UploadInputTrigger } from './input-trigger'
import type { UploadProps } from './types'
import { useUpload } from './use-upload'

export function Upload({
  value,
  onChange,
  upload,
  accept,
  multiple = true,
  maxCount,
  disabled,
  placeholder = 'Click or drag to upload',
  presentation,
  preview,
  fileList,
  className,
}: UploadProps) {
  const uploadState = useUpload({
    value,
    onChange,
    upload,
    multiple,
    maxCount,
    disabled,
    placeholder,
    presentation,
    preview,
    fileList,
  })

  return (
    <div className={cn(uploadRootClassName, className)}>
      {uploadState.presentation === 'input' && (
        <UploadInputTrigger
          firstFile={uploadState.firstFile}
          placeholder={placeholder}
          disabled={disabled}
          triggerDisabled={uploadState.triggerDisabled}
          dragging={uploadState.dragging}
          preview={uploadState.previewEnabled}
          onBrowse={uploadState.browse}
          onUrlChange={uploadState.updateUrl}
          onDragOver={uploadState.handleDragOver}
          onDragLeave={uploadState.handleDragLeave}
          onDrop={uploadState.handleDrop}
        />
      )}
      {uploadState.presentation === 'compact' && (
        <UploadCompactTrigger
          files={uploadState.files}
          triggerDisabled={uploadState.triggerDisabled}
          dragging={uploadState.dragging}
          selectedLabel={uploadState.selectedLabel}
          onBrowse={uploadState.browse}
          onDragOver={uploadState.handleDragOver}
          onDragLeave={uploadState.handleDragLeave}
          onDrop={uploadState.handleDrop}
        />
      )}
      {uploadState.presentation === 'dropzone' && (
        <UploadDropzoneTrigger
          placeholder={placeholder}
          triggerDisabled={uploadState.triggerDisabled}
          reachedMax={uploadState.reachedMax}
          dragging={uploadState.dragging}
          onBrowse={uploadState.browse}
          onDragOver={uploadState.handleDragOver}
          onDragLeave={uploadState.handleDragLeave}
          onDrop={uploadState.handleDrop}
        />
      )}
      <input
        ref={uploadState.inputRef}
        type="file"
        className={uploadNativeInputClassName}
        accept={accept}
        multiple={multiple}
        disabled={uploadState.triggerDisabled}
        onChange={(e) => {
          void uploadState.addFiles(e.target.files)
          e.currentTarget.value = ''
        }}
      />
      {uploadState.fileListEnabled && (
        <UploadFileList
          files={uploadState.files}
          disabled={disabled}
          onRemove={uploadState.removeFile}
        />
      )}
    </div>
  )
}
