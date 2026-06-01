'use client'

import { File, ImageIcon, Upload as UploadIcon, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface UploadFile {
  uid: string
  name: string
  url?: string
  status?: 'uploading' | 'done' | 'error'
  size?: number
}

export type UploadResult = string | Partial<UploadFile> | null | false | undefined

export interface UploadContext {
  maxCount?: number
  multiple: boolean
}

export interface UploadProps {
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  upload?: (
    files: File[],
    context: UploadContext,
  ) => UploadResult | UploadResult[] | Promise<UploadResult | UploadResult[]>
  accept?: string
  multiple?: boolean
  maxCount?: number
  disabled?: boolean
  placeholder?: string
  variant?: 'default' | 'compact'
  mode?: 'upload' | 'input'
  preview?: boolean
  fileList?: boolean
  className?: string
}

export function Upload({
  value,
  onChange,
  upload,
  accept,
  multiple = true,
  maxCount,
  disabled,
  placeholder = 'Click or drag to upload',
  variant = 'default',
  mode = 'upload',
  preview,
  fileList,
  className,
}: UploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<UploadFile[]>([])
  const compact = variant === 'compact'
  const input = mode === 'input'
  const shouldShowFileList = fileList ?? !compact
  const files = value ?? internalValue

  function setFiles(nextFiles: UploadFile[]) {
    if (value === undefined) setInternalValue(nextFiles)
    onChange?.(nextFiles)
  }

  async function addFiles(fileList: FileList | null) {
    if (!fileList) return
    const availableSlots = multiple && maxCount ? Math.max(maxCount - files.length, 0) : undefined
    if (availableSlots === 0) return

    const selectedFiles = Array.from(fileList).slice(0, multiple ? availableSlots : 1)
    if (!selectedFiles.length) return

    const newFiles = (
      await createUploadFiles(selectedFiles, upload, {
        maxCount,
        multiple,
      })
    ).filter((file): file is UploadFile => Boolean(file))

    if (!newFiles.length) return

    if (!multiple) {
      files.forEach((file) => {
        if (file.url?.startsWith('blob:')) URL.revokeObjectURL(file.url)
      })
    }

    const merged = multiple ? [...files, ...newFiles] : [newFiles[0]]
    const sliced = maxCount ? merged.slice(0, maxCount) : merged
    setFiles(sliced)
  }

  function handleDragOver(event: React.DragEvent<HTMLElement>) {
    event.preventDefault()
    if (!triggerDisabled) setDragging(true)
  }

  function handleDrop(event: React.DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragging(false)
    if (!triggerDisabled) void addFiles(event.dataTransfer.files)
  }

  function removeFile(uid: string) {
    const removed = files.find((f) => f.uid === uid)
    if (removed?.url?.startsWith('blob:')) URL.revokeObjectURL(removed.url)
    setFiles(files.filter((f) => f.uid !== uid))
  }

  function updateUrl(url: string) {
    const current = files[0]
    const nextUrl = url.trim()

    if (current?.url?.startsWith('blob:') && current.url !== nextUrl) {
      URL.revokeObjectURL(current.url)
    }

    if (!nextUrl) {
      setFiles([])
      return
    }

    setFiles([
      {
        uid: current?.uid ?? `${Date.now()}-${Math.random()}`,
        name: getUrlFileName(nextUrl),
        status: 'done',
        url: nextUrl,
      },
    ])
  }

  const firstFile = files[0]
  const reachedMax = multiple && maxCount !== undefined && files.length >= maxCount
  const triggerDisabled = disabled || reachedMax
  const selectedLabel = files.length
    ? files.map((file) => file.name).join(', ')
    : compact
      ? placeholder
      : undefined
  const shouldShowPreview = input && (preview ?? isImageUpload(firstFile, accept))

  return (
    <div className={cn('space-y-2', className)}>
      {input ? (
        <fieldset
          aria-label="Upload files"
          className={cn(
            'flex h-9 min-w-0 w-full items-center rounded-md border border-input bg-transparent px-2 text-sm shadow-xs',
            'transition-[color,box-shadow]',
            'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
            dragging && 'border-primary bg-primary/5',
            'dark:bg-input/30',
            triggerDisabled && 'pointer-events-none opacity-50',
          )}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {shouldShowPreview && (
            <div className="mr-2 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded border bg-muted">
              {firstFile?.url ? (
                <img src={firstFile.url} alt="" className="size-full object-cover" />
              ) : (
                <ImageIcon className="size-3.5 text-muted-foreground" />
              )}
            </div>
          )}
          <input
            type="text"
            inputMode="url"
            value={firstFile?.url ?? ''}
            disabled={disabled}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            onChange={(event) => updateUrl(event.target.value)}
          />
          {firstFile?.url && !disabled && (
            <button
              type="button"
              aria-label="Clear URL"
              className="ml-1 inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground"
              onClick={() => updateUrl('')}
            >
              <X className="size-3.5" />
            </button>
          )}
          <button
            type="button"
            aria-label="Upload files"
            disabled={triggerDisabled}
            className="ml-1 inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground disabled:pointer-events-none"
            onClick={() => inputRef.current?.click()}
          >
            <UploadIcon className="size-4" />
          </button>
        </fieldset>
      ) : compact ? (
        <button
          type="button"
          aria-label="Upload files"
          disabled={triggerDisabled}
          className={cn(
            'flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 text-sm shadow-xs',
            'transition-[color,box-shadow]',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
            dragging && 'border-primary bg-primary/5',
            'disabled:pointer-events-none disabled:opacity-50 dark:bg-input/30',
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-left',
              !files.length && 'text-muted-foreground',
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
              triggerDisabled && 'opacity-50 cursor-not-allowed',
              !triggerDisabled && 'hover:border-primary hover:bg-primary/5',
            )}
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
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
        disabled={triggerDisabled}
        onChange={(e) => {
          void addFiles(e.target.files)
          e.currentTarget.value = ''
        }}
      />
      {shouldShowFileList && files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f) => (
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

function getUrlFileName(url: string) {
  try {
    const parsed = new URL(url)
    const name = parsed.pathname.split('/').filter(Boolean).pop()
    return name ? decodeURIComponent(name) : url
  } catch {
    return url.split(/[/?#]/).filter(Boolean).pop() ?? url
  }
}

async function createUploadFiles(
  files: File[],
  upload?: UploadProps['upload'],
  context?: UploadContext,
): Promise<Array<UploadFile | null>> {
  if (!upload) return files.map((file) => createUploadFile(file))

  try {
    const result = await upload(files, context ?? { multiple: files.length > 1 })
    const results = Array.isArray(result) ? result : [result]

    return files.map((file, index) => createUploadFile(file, results[index]))
  } catch {
    return files.map((file) => createUploadFileFromResult(file, { status: 'error' }))
  }
}

function createUploadFile(file: File, result?: UploadResult): UploadFile | null {
  const baseFile: UploadFile = {
    uid: `${Date.now()}-${Math.random()}`,
    name: file.name,
    size: file.size,
    status: 'done',
  }

  if (result === false || result === null) return null
  if (typeof result === 'string') return { ...baseFile, url: result }
  if (typeof result === 'object') return { ...baseFile, ...result }

  return {
    ...baseFile,
    url: URL.createObjectURL(file),
  }
}

function createUploadFileFromResult(file: File, result: Partial<UploadFile>): UploadFile {
  return {
    uid: `${Date.now()}-${Math.random()}`,
    name: file.name,
    size: file.size,
    status: 'done',
    ...result,
  }
}

function isImageUpload(file?: UploadFile, accept?: string) {
  if (accept?.toLowerCase().includes('image')) return true
  return Boolean(file?.url?.match(/\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i))
}
