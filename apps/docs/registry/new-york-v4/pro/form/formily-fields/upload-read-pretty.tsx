import type { UploadFile } from '../../base/fields/upload'
import {
  readPrettyTextClassName,
  readPrettyUploadClassName,
  readPrettyUploadFileClassName,
} from './classes'

export function UploadReadPretty({ files }: { files?: UploadFile[] }) {
  return (
    <div className={readPrettyUploadClassName}>
      {files?.length ? (
        files.map((file) => (
          <span key={file.uid} className={readPrettyUploadFileClassName}>
            {file.url ? (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            ) : (
              file.name
            )}
          </span>
        ))
      ) : (
        <span className={readPrettyTextClassName}>-</span>
      )}
    </div>
  )
}
