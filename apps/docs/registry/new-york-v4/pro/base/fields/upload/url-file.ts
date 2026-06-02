import type { UploadFile } from './types'
import { getUrlFileName } from './utils'

export function createUrlUploadFile(url: string, current?: UploadFile): UploadFile {
  return {
    uid: current?.uid ?? `${Date.now()}-${Math.random()}`,
    name: getUrlFileName(url),
    status: 'done',
    url,
  }
}
