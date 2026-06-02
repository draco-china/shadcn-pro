import type { UploadFile, UploadProps, UploadSelectedFiles } from './types'

export function getUploadState({
  files,
  multiple,
  maxCount,
  disabled,
  placeholder,
  presentation,
  preview,
  fileList,
}: Pick<
  UploadProps,
  'multiple' | 'maxCount' | 'disabled' | 'placeholder' | 'presentation' | 'preview' | 'fileList'
> & {
  files: UploadFile[]
}) {
  const allowMultiple = multiple ?? true
  const currentPresentation = presentation ?? 'dropzone'
  const reachedMax = allowMultiple && maxCount !== undefined && files.length >= maxCount

  return {
    allowMultiple,
    firstFile: files[0],
    reachedMax,
    presentation: currentPresentation,
    triggerDisabled: disabled || reachedMax,
    selectedLabel: files.length
      ? files.map((file) => file.name).join(', ')
      : currentPresentation === 'compact'
        ? placeholder
        : undefined,
    fileListEnabled: fileList ?? currentPresentation === 'dropzone',
    previewEnabled: currentPresentation === 'input' && preview !== false,
  }
}

export function getUploadAvailableSlots({
  files,
  allowMultiple,
  maxCount,
}: {
  files: UploadFile[]
  allowMultiple: boolean
  maxCount?: number
}) {
  return allowMultiple && maxCount ? Math.max(maxCount - files.length, 0) : undefined
}

export function getSelectedUploadFiles({
  selectedFileList,
  allowMultiple,
  availableSlots,
}: {
  selectedFileList: UploadSelectedFiles
  allowMultiple: boolean
  availableSlots?: number
}) {
  return Array.from(selectedFileList).slice(0, allowMultiple ? availableSlots : 1)
}

export function mergeUploadFiles({
  files,
  newFiles,
  allowMultiple,
  maxCount,
}: {
  files: UploadFile[]
  newFiles: UploadFile[]
  allowMultiple: boolean
  maxCount?: number
}) {
  const merged = allowMultiple ? [...files, ...newFiles] : [newFiles[0]]
  return maxCount ? merged.slice(0, maxCount) : merged
}
