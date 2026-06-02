import type { UploadFile } from './types'

export function getUrlFileName(url: string) {
  try {
    const parsed = new URL(url)
    const name = parsed.pathname.split('/').filter(isNonEmptyString).pop()
    return name ? decodeURIComponent(name) : url
  } catch {
    return url.split(/[/?#]/).filter(isNonEmptyString).pop() ?? url
  }
}

export function revokeBlobUrl(file?: UploadFile) {
  if (file?.url?.startsWith('blob:')) URL.revokeObjectURL(file.url)
}

export function isUploadFile(file: UploadFile | null): file is UploadFile {
  return file !== null
}

function isNonEmptyString(value: string) {
  return value.length > 0
}
