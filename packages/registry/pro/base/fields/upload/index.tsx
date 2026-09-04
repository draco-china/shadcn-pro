'use client'

import { cva } from 'class-variance-authority'
import { File, Upload as UploadIcon, X } from 'lucide-react'
import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'

/** File metadata managed by Upload. */
export interface UploadFile {
  uid: string
  name: string
  url?: string
  status?: 'uploading' | 'done' | 'error'
  size?: number
}

type UploadResult = string | Partial<UploadFile> | null | false | undefined

const UploadContext = createContext<{
  inputRef: RefObject<HTMLInputElement | null>
  files: UploadFile[]
  reachedMax: boolean
  disabled: boolean
  addFiles: (selectedFileList: FileList | File[] | null) => Promise<void>
  removeFile: (uid: string) => void
} | null>(null)
const uploadTriggerVariants = cva('w-full', {
  variants: {
    variant: {
      compact:
        'justify-start bg-transparent px-3 font-normal dark:bg-input/30 dark:hover:bg-input/50',
      dropzone: 'h-auto flex-col gap-2 border-2 border-dashed p-6 text-muted-foreground',
    },
    dragging: {
      true: 'border-primary bg-primary/5',
    },
  },
  defaultVariants: {
    variant: 'dropzone',
    dragging: false,
  },
})

function useUploadContext() {
  const context = useContext(UploadContext)
  if (!context) throw new Error('Upload components must be used inside <Upload>.')
  return context
}

/** Upload state provider with optional async upload transformation. */
export function Upload({
  value,
  onChange,
  upload,
  accept,
  multiple = true,
  maxCount,
  disabled,
  className,
  children,
}: {
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  upload?: (
    files: File[],
    context: { maxCount?: number; multiple: boolean },
  ) => UploadResult | UploadResult[] | Promise<UploadResult | UploadResult[]>
  accept?: string
  multiple?: boolean
  maxCount?: number
  disabled?: boolean
  className?: string
  children?: ReactNode
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [internalValue, setInternalValue] = useState<UploadFile[]>([])
  const files = value ?? internalValue
  const filesRef = useRef(files)
  filesRef.current = files
  const objectUrlsRef = useRef(new Set<string>())
  const remainingSlots =
    multiple && maxCount !== undefined ? Math.max(maxCount - files.length, 0) : 1
  const reachedMax = remainingSlots === 0

  function setFiles(nextFiles: UploadFile[]) {
    filesRef.current = nextFiles
    if (value === undefined) setInternalValue(nextFiles)
    onChange?.(nextFiles)
  }

  function releaseObjectUrl(url?: string) {
    if (!url || !objectUrlsRef.current.delete(url)) return
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const currentUrls = new Set(files.flatMap((file) => (file.url ? [file.url] : [])))
    for (const url of objectUrlsRef.current) {
      if (!currentUrls.has(url)) releaseObjectUrl(url)
    }
  }, [files])

  useEffect(
    () => () => {
      for (const url of objectUrlsRef.current) URL.revokeObjectURL(url)
      objectUrlsRef.current.clear()
    },
    [],
  )

  async function addFiles(selectedFileList: FileList | File[] | null) {
    if (!selectedFileList) return

    const selectedFiles = Array.from(selectedFileList).slice(0, remainingSlots)
    if (!selectedFiles.length) return

    let uploadResults: UploadResult[] | undefined
    if (upload) {
      try {
        const result = await Promise.resolve(upload(selectedFiles, { maxCount, multiple }))
        if (Array.isArray(result)) uploadResults = result
        else uploadResults = [result]
      } catch {
        uploadResults = Array.from({ length: selectedFiles.length }, () => ({ status: 'error' }))
      }
    }

    const newFiles = selectedFiles.flatMap((file, index) => {
      const result = uploadResults?.[index]
      if (result === false || result === null) return []

      const baseFile: UploadFile = {
        uid: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        status: 'done',
      }

      if (typeof result === 'string') {
        return [{ ...baseFile, url: result }]
      }
      if (typeof result === 'object') {
        return [{ ...baseFile, ...result }]
      }
      const url = URL.createObjectURL(file)
      objectUrlsRef.current.add(url)
      return [{ ...baseFile, url }]
    })
    if (!newFiles.length) return

    if (!multiple) {
      for (const file of filesRef.current) releaseObjectUrl(file.url)
      setFiles([newFiles[0]])
      return
    }

    const currentFiles = filesRef.current
    const available =
      maxCount === undefined ? newFiles.length : Math.max(maxCount - currentFiles.length, 0)
    const acceptedFiles = newFiles.slice(0, available)
    for (const file of newFiles.slice(available)) releaseObjectUrl(file.url)
    if (acceptedFiles.length) setFiles([...currentFiles, ...acceptedFiles])
  }

  function removeFile(uid: string) {
    const currentFiles = filesRef.current
    const removedFile = currentFiles.find((file) => file.uid === uid)
    releaseObjectUrl(removedFile?.url)
    setFiles(currentFiles.filter((file) => file.uid !== uid))
  }

  return (
    <UploadContext.Provider
      value={{
        inputRef,
        files,
        reachedMax,
        disabled: !!disabled,
        addFiles,
        removeFile,
      }}
    >
      <div className={cn('space-y-2', className)}>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled || reachedMax}
          onChange={async (e) => {
            await addFiles(e.target.files)
            e.currentTarget.value = ''
          }}
        />
        {children}
      </div>
    </UploadContext.Provider>
  )
}

/** Click and drop trigger for the nearest Upload provider. */
export function UploadTrigger({
  variant = 'dropzone',
  className,
}: {
  variant?: 'compact' | 'dropzone'
  className?: string
}) {
  const upload = useUploadContext()
  const [dragging, setDragging] = useState(false)
  const fileNames = upload.files.map((file) => file.name).join(', ')
  const hasFiles = upload.files.length > 0
  const canUpload = !upload.disabled && !upload.reachedMax
  const triggerClassName =
    variant === 'dropzone' && canUpload
      ? cn('cursor-pointer hover:border-primary hover:bg-primary/5', className)
      : className
  const triggerContent = renderUploadTriggerContent({ variant, hasFiles, fileNames })

  if (variant === 'dropzone' && upload.reachedMax) return null

  return (
    <ProButton
      variant="outline"
      aria-label="Upload files"
      disabled={!canUpload}
      className={uploadTriggerVariants({
        variant,
        dragging,
        className: triggerClassName,
      })}
      onClick={() => upload.inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault()
        if (canUpload) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        if (canUpload) upload.addFiles(event.dataTransfer.files).catch(() => {})
      }}
    >
      {triggerContent}
    </ProButton>
  )
}

function renderUploadTriggerContent({
  variant,
  hasFiles,
  fileNames,
}: {
  variant: 'compact' | 'dropzone'
  hasFiles: boolean
  fileNames: string
}) {
  const label = hasFiles ? fileNames : 'Upload files'
  if (variant === 'compact') {
    return (
      <>
        <span
          className={cn('min-w-0 flex-1 truncate text-left', !hasFiles && 'text-muted-foreground')}
        >
          {label}
        </span>
        <UploadIcon className="ml-2 size-4 shrink-0 text-muted-foreground" />
      </>
    )
  }

  return (
    <>
      <UploadIcon className="size-6" />
      <span>{hasFiles ? fileNames : 'Click or drag to upload'}</span>
    </>
  )
}

/** Current file list for the nearest Upload provider. */
export function UploadFileList({ className }: { className?: string }) {
  const upload = useUploadContext()

  if (!upload.files.length) return null

  return (
    <ul className={cn('space-y-1', className)}>
      {upload.files.map((file) => (
        <li
          key={file.uid}
          className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
        >
          <File className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate">{file.name}</span>
          {!upload.disabled && (
            <ProButton
              variant="ghost"
              size="icon-xs"
              aria-label={`Remove ${file.name}`}
              onClick={() => upload.removeFile(file.uid)}
              className="shrink-0"
            >
              <X />
            </ProButton>
          )}
        </li>
      ))}
    </ul>
  )
}
