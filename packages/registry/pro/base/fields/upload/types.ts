export interface UploadFile {
  uid: string
  name: string
  url?: string
  status?: 'uploading' | 'done' | 'error'
  size?: number
}

export type UploadSelectedFiles = FileList | File[]

export type UploadPresentation = 'dropzone' | 'compact' | 'input'

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
  presentation?: UploadPresentation
  preview?: boolean
  fileList?: boolean
  className?: string
}

export interface ImageUploadProps extends UploadProps {
  accept?: string
  presentation?: 'compact' | 'input'
  preview?: boolean
}
