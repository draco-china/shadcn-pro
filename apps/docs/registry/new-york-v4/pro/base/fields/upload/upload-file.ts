import type { UploadContext, UploadFile, UploadProps, UploadResult } from './types'

export async function createUploadFiles(
  files: File[],
  context: UploadContext,
  upload?: UploadProps['upload'],
): Promise<Array<UploadFile | null>> {
  if (!upload) return files.map((file) => createUploadFile(file))

  try {
    const result = await upload(files, context)
    const results = Array.isArray(result) ? result : [result]

    return files.map((file, index) => createUploadFile(file, results[index]))
  } catch {
    return files.map((file) => createUploadFileFromResult(file, { status: 'error' }))
  }
}

function createUploadFile(file: File, result?: UploadResult): UploadFile | null {
  const baseFile = createUploadFileFromResult(file, { status: 'done' })

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
    ...result,
  }
}
