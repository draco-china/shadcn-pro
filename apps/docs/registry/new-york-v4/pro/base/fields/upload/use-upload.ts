'use client'

import { useRef } from 'react'
import { getUploadState } from './state'
import type { UploadProps } from './types'
import { useUploadActions } from './use-upload-actions'
import { useUploadDrag } from './use-upload-drag'
import { useUploadFiles } from './use-upload-files'

export function useUpload({
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
}: Pick<
  UploadProps,
  | 'value'
  | 'onChange'
  | 'upload'
  | 'multiple'
  | 'maxCount'
  | 'disabled'
  | 'placeholder'
  | 'presentation'
  | 'preview'
  | 'fileList'
>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { files, setFiles } = useUploadFiles({ value, onChange })
  const uploadState = getUploadState({
    files,
    multiple,
    maxCount,
    disabled,
    placeholder,
    presentation,
    preview,
    fileList,
  })
  const actions = useUploadActions({
    files,
    setFiles,
    allowMultiple: uploadState.allowMultiple,
    maxCount,
    upload,
  })
  const drag = useUploadDrag({ disabled: uploadState.triggerDisabled, onDrop: actions.addFiles })
  function browse() {
    inputRef.current?.click()
  }

  return {
    inputRef,
    files,
    firstFile: uploadState.firstFile,
    reachedMax: uploadState.reachedMax,
    presentation: uploadState.presentation,
    triggerDisabled: uploadState.triggerDisabled,
    dragging: drag.dragging,
    selectedLabel: uploadState.selectedLabel,
    fileListEnabled: uploadState.fileListEnabled,
    previewEnabled: uploadState.previewEnabled,
    browse,
    addFiles: actions.addFiles,
    removeFile: actions.removeFile,
    updateUrl: actions.updateUrl,
    handleDragOver: drag.handleDragOver,
    handleDragLeave: drag.handleDragLeave,
    handleDrop: drag.handleDrop,
  }
}
