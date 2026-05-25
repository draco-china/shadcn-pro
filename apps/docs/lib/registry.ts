import { promises as fs } from 'node:fs'
import path from 'node:path'
import { LRUCache } from 'lru-cache'
import type * as React from 'react'
import { type RegistryItem, registryItemSchema } from 'shadcn/schema'
import { ExamplesIndex } from '@/examples/__index__'

import { readFileFromRoot } from '@/lib/read-file'
import { Index as StylesIndex } from '@/registry/__index__'
import { BASES } from '@/registry/bases'

// LRU cache for cross-request caching of registry items.
// File reads are I/O-bound, so caching improves dev server performance.
// biome-ignore lint/suspicious/noExplicitAny: LRU cache for mixed registry values
const registryCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes (shorter for dev to pick up changes).
})

type RegistryItemFile = {
  path?: string
  target?: string
  type?: RegistryItem['type']
  content?: string
}
type RegistryIndexItem = {
  name: string
  type?: string
  component?: React.ComponentType
  files?: Array<string | RegistryItemFile>
}

type RegistryIndex = Record<string, RegistryIndexItem>

const styleIndexes = StylesIndex as Record<string, RegistryIndex | undefined>

function getBaseForStyle(styleName: string) {
  for (const base of BASES) {
    if (styleName.startsWith(`${base.name}-`)) {
      return base.name
    }
  }
  return null
}

function getDemoIndexKey(styleName: string) {
  if (ExamplesIndex[styleName]) {
    return styleName
  }

  const base = getBaseForStyle(styleName)
  if (base && ExamplesIndex[base]) {
    return base
  }

  return styleName
}

function getStyleIndex(styleName: string) {
  return styleIndexes[styleName] ?? null
}

function getRegistryEntry(name: string, styleName: string) {
  return getStyleIndex(styleName)?.[name] ?? null
}

export function getDemoComponent(name: string, styleName: string) {
  const key = getDemoIndexKey(styleName)
  return ExamplesIndex[key]?.[name]?.component
}

export async function getDemoItem(name: string, styleName: string) {
  const key = getDemoIndexKey(styleName)
  const demo = ExamplesIndex[key]?.[name]
  if (!demo) {
    return null
  }

  const content = await readFileFromRoot(demo.filePath)

  return {
    name: demo.name,
    type: 'registry:internal' as const,
    files: [
      {
        path: demo.filePath,
        content,
        type: 'registry:internal' as const,
      },
    ],
  }
}

export function getRegistryComponent(name: string, styleName: string) {
  const demoComponent = getDemoComponent(name, styleName)
  if (demoComponent) {
    return demoComponent
  }

  return getRegistryEntry(name, styleName)?.component
}

export async function getRegistryItems(
  styleName: string,
  filter?: (item: RegistryItem) => boolean,
) {
  const styleIndex = getStyleIndex(styleName)

  if (!styleIndex) {
    return []
  }

  const entries = Object.values(styleIndex)

  const filteredEntries = filter
    ? entries.filter((entry) => {
        const result = registryItemSchema.safeParse(normalizeRegistryItem(entry))
        return result.success && filter(result.data as RegistryItem)
      })
    : entries

  return await Promise.all(
    filteredEntries.map(async (entry) => {
      const item = await getRegistryItem(entry.name, styleName)
      return item
    }),
  ).then((results) => results.filter(Boolean))
}

export async function getRegistryItem(name: string, styleName: string) {
  const cacheKey = `${styleName}:${name}`

  // Check cache first.
  if (registryCache.has(cacheKey)) {
    return registryCache.get(cacheKey)
  }

  const item = getRegistryEntry(name, styleName)

  if (!item) {
    registryCache.set(cacheKey, null)
    return null
  }

  const normalizedItem = normalizeRegistryItem(item)

  // Convert all file paths to object.
  // TODO: remove when we migrate to new registry.
  // Fail early before doing expensive file operations.
  const result = registryItemSchema.safeParse(normalizedItem)
  if (!result.success) {
    registryCache.set(cacheKey, null)
    return null
  }

  // Read all files in parallel.
  let files: RegistryItemFile[] = await Promise.all(
    (((result.data as RegistryItem).files ?? []) as RegistryItemFile[]).map(async (file) => {
      const content = await getFileContent(file)
      const relativePath = file.path ? path.relative(process.cwd(), file.path) : ''

      return {
        ...file,
        path: relativePath,
        content,
      }
    }),
  )

  // Fix file paths.
  files = fixFilePaths(files)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files: files as RegistryItem['files'],
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    registryCache.set(cacheKey, null)
    return null
  }

  // Cache the result.
  registryCache.set(cacheKey, parsed.data)

  return parsed.data
}

function normalizeRegistryItem(item: RegistryIndexItem) {
  return {
    ...item,
    files: (item.files ?? []).map((file) => (typeof file === 'string' ? { path: file } : file)),
  }
}

async function getFileContent(file: RegistryItemFile) {
  if (!file.path) return ''

  let code = await fs.readFile(file.path, 'utf-8')

  // Some registry items uses default export.
  // We want to use named export instead.
  if (file.type !== 'registry:page') {
    code = code.replaceAll('export default', 'export')
  }

  // Fix imports.
  code = fixImport(code)

  return code
}

function getFileTarget(file: RegistryItemFile) {
  let target = file.target
  const sourcePath = file.path ?? ''

  if (!target || target === '') {
    const fileName = sourcePath.split('/').pop()
    if (
      file.type === 'registry:block' ||
      file.type === 'registry:component' ||
      file.type === 'registry:example'
    ) {
      target = `components/${fileName}`
    }

    if (file.type === 'registry:ui') {
      target = `components/ui/${fileName}`
    }

    if (file.type === 'registry:hook') {
      target = `hooks/${fileName}`
    }

    if (file.type === 'registry:lib') {
      target = `lib/${fileName}`
    }
  }

  return target ?? ''
}

function fixFilePaths(files: RegistryItemFile[]) {
  if (!files) {
    return []
  }

  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0]?.path ?? ''
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map((file) => {
    const filePath = file.path ?? ''
    return {
      ...file,
      path: filePath ? path.relative(firstFilePathDir, filePath) : filePath,
      target: getFileTarget(file),
    }
  })
}

export function fixImport(content: string) {
  content = content.replace(
    /@\/styles\/([\w-]+)\/(ui-rtl|ui)\/([\w-]+)/g,
    (match, _styleName, type, component) => {
      if (type === 'ui' || type === 'ui-rtl') {
        return `@/components/ui/${component}`
      }

      return match
    },
  )

  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const replacement = (match: string, _path: string, type: string, component: string) => {
    if (type.endsWith('components')) {
      return `@/components/${component}`
    } else if (type.endsWith('ui')) {
      return `@/components/ui/${component}`
    } else if (type.endsWith('hooks')) {
      return `@/hooks/${component}`
    } else if (type.endsWith('lib')) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>,
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split('/')
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path
        } else {
          // Move to next level in the tree
          // biome-ignore lint/style/noNonNullAssertion: non-file nodes always have children
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile ? { name: part, path } : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          // biome-ignore lint/style/noNonNullAssertion: just created with children: []
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
