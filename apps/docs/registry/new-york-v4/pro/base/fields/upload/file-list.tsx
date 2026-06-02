import { File, X } from 'lucide-react'
import { ProButton } from '@/components/pro/base/button'
import {
  uploadFileIconClassName,
  uploadFileListClassName,
  uploadFileListItemClassName,
  uploadFileNameClassName,
  uploadFileRemoveButtonClassName,
  uploadFileRemoveIconClassName,
} from './classes'
import type { UploadFile } from './types'

interface UploadFileListProps {
  files: UploadFile[]
  disabled?: boolean
  onRemove: (uid: string) => void
}

export function UploadFileList({ files, disabled, onRemove }: UploadFileListProps) {
  if (!files.length) return null

  return (
    <ul className={uploadFileListClassName}>
      {files.map((file) => (
        <li key={file.uid} className={uploadFileListItemClassName}>
          <File className={uploadFileIconClassName} />
          <span className={uploadFileNameClassName}>{file.name}</span>
          {!disabled && (
            <ProButton
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${file.name}`}
              onClick={() => onRemove(file.uid)}
              className={uploadFileRemoveButtonClassName}
            >
              <X className={uploadFileRemoveIconClassName} />
            </ProButton>
          )}
        </li>
      ))}
    </ul>
  )
}
