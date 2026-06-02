'use client'

import { getSelectedUploadFiles, getUploadAvailableSlots, mergeUploadFiles } from './state'
import type { UploadFile, UploadProps, UploadSelectedFiles } from './types'
import { createUploadFiles } from './upload-file'
import { createUrlUploadFile } from './url-file'
import { isUploadFile, revokeBlobUrl } from './utils'

interface UploadActionsOptions {
  files: UploadFile[]
  setFiles: (files: UploadFile[]) => void
  allowMultiple: boolean
  maxCount?: number
  upload?: UploadProps['upload']
}

export function useUploadActions({
  files,
  setFiles,
  allowMultiple,
  maxCount,
  upload,
}: UploadActionsOptions) {
  async function addFiles(selectedFileList: UploadSelectedFiles | null) {
    if (!selectedFileList) return

    const availableSlots = getUploadAvailableSlots({ files, allowMultiple, maxCount })
    if (availableSlots === 0) return

    const selectedFiles = getSelectedUploadFiles({
      selectedFileList,
      allowMultiple,
      availableSlots,
    })
    if (!selectedFiles.length) return

    const uploadedFiles = await createUploadFiles(
      selectedFiles,
      {
        maxCount,
        multiple: allowMultiple,
      },
      upload,
    )
    const newFiles = uploadedFiles.filter(isUploadFile)
    if (!newFiles.length) return

    if (!allowMultiple) files.forEach(revokeBlobUrl)

    setFiles(mergeUploadFiles({ files, newFiles, allowMultiple, maxCount }))
  }

  function removeFile(uid: string) {
    const removed = files.find((file) => file.uid === uid)
    revokeBlobUrl(removed)
    setFiles(files.filter((file) => file.uid !== uid))
  }

  function updateUrl(url: string) {
    const current = files[0]
    const nextUrl = url.trim()

    if (current?.url !== nextUrl) revokeBlobUrl(current)

    if (!nextUrl) {
      setFiles([])
      return
    }

    setFiles([createUrlUploadFile(nextUrl, current)])
  }

  return { addFiles, removeFile, updateUrl }
}
