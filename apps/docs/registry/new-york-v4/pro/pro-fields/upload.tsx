'use client'

import { File, Upload as UploadIcon, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface UploadFile {
  uid: string
  name: string
  url?: string
  status?: 'uploading' | 'done' | 'error'
  size?: number
}

export interface UploadProps {
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  accept?: string
  multiple?: boolean
  maxCount?: number
  disabled?: boolean
  placeholder?: string
  variant?: 'dropzone' | 'compact'
  showFileList?: boolean
  className?: string
}

export function Upload({
  value = [],
  onChange,
  accept,
  multiple = true,
  maxCount,
  disabled,
  placeholder = 'Click or drag to upload',
  variant = 'dropzone',
  showFileList,
  className,
}: UploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const compact = variant === 'compact'
  const shouldShowFileList = showFileList ?? !compact

  function addFiles(files: FileList | null) {
    if (!files) return
    const newFiles: UploadFile[] = Array.from(files).map((f) => ({
      uid: `${Date.now()}-${Math.random()}`,
      name: f.name,
      size: f.size,
      status: 'done' as const,
      url: URL.createObjectURL(f),
    }))
    const merged = multiple ? [...value, ...newFiles] : [newFiles[0]]
    const sliced = maxCount ? merged.slice(0, maxCount) : merged
    onChange?.(sliced)
  }

  function removeFile(uid: string) {
    const removed = value.find((f) => f.uid === uid)
    if (removed?.url?.startsWith('blob:')) URL.revokeObjectURL(removed.url)
    onChange?.(value.filter((f) => f.uid !== uid))
  }

  const reachedMax = maxCount !== undefined && value.length >= maxCount
  const selectedLabel = value.length
    ? value.map((file) => file.name).join(', ')
    : compact
      ? placeholder
      : undefined

  return (
    <div className={cn('space-y-2', className)}>
      {compact ? (
        <button
          type="button"
          aria-label="Upload files"
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 text-sm shadow-xs',
            'transition-[color,box-shadow]',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30',
          )}
          onClick={() => inputRef.current?.click()}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-left',
              !value.length && 'text-muted-foreground',
            )}
          >
            {selectedLabel}
          </span>
          <UploadIcon className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </button>
      ) : (
        !reachedMax && (
          <button
            type="button"
            aria-label="Upload files"
            disabled={disabled}
            className={cn(
              'flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6',
              'text-sm text-muted-foreground transition-colors cursor-pointer',
              dragging && 'border-primary bg-primary/5',
              disabled && 'opacity-50 cursor-not-allowed',
              !disabled && 'hover:border-primary hover:bg-primary/5',
            )}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              !disabled && setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              if (!disabled) addFiles(e.dataTransfer.files)
            }}
          >
            <UploadIcon className="size-6" />
            <span>{placeholder}</span>
          </button>
        )
      )}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          addFiles(e.target.files)
          e.currentTarget.value = ''
        }}
      />
      {shouldShowFileList && value.length > 0 && (
        <ul className="space-y-1">
          {value.map((f) => (
            <li
              key={f.uid}
              className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
            >
              <File className="size-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{f.name}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => removeFile(f.uid)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
