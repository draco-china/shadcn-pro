import { promises as fs } from 'node:fs'
import path from 'node:path'

const allowedRoots = new Set(['components', 'content', 'lib', 'registry'])

export async function readFileFromRoot(relativePath: string) {
  const normalizedPath = path.normalize(relativePath)
  const [root, ...segments] = normalizedPath.split(path.sep)

  if (!root || !allowedRoots.has(root) || segments.some((segment) => segment === '..')) {
    throw new Error(`Unsupported docs source path: ${relativePath}`)
  }

  const cwd = /* turbopackIgnore: true */ process.cwd()
  let absolutePath: string

  switch (root) {
    case 'components':
      absolutePath = path.join(cwd, 'components', ...segments)
      break
    case 'content':
      absolutePath = path.join(cwd, 'content', ...segments)
      break
    case 'lib':
      absolutePath = path.join(cwd, 'lib', ...segments)
      break
    case 'registry':
      absolutePath = path.join(cwd, 'registry', ...segments)
      break
    default:
      throw new Error(`Unsupported docs source path: ${relativePath}`)
  }

  return fs.readFile(absolutePath, 'utf-8')
}
