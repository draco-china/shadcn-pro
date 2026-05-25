import { promises as fs } from 'node:fs'
import path from 'node:path'

export async function readFileFromRoot(relativePath: string) {
  const absolutePath = path.join(/* turbopackIgnore: true */ process.cwd(), relativePath)
  return fs.readFile(absolutePath, 'utf-8')
}
