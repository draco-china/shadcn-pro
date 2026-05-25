/**
 * Build-time script: reads all block source files, highlights them with shiki,
 * and writes the result to lib/__blocks-generated__.ts
 *
 * Run: bun scripts/generate-blocks-data.ts
 */

import fs from 'node:fs'
import path from 'node:path'
import { codeToHtml } from 'shiki'
import { CATEGORIES } from '../lib/blocks-categories'

const CWD = process.cwd() // apps/docs
const OUT = path.join(CWD, 'lib/__blocks-generated__.ts')

async function highlight(code: string, lang = 'tsx'): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: { dark: 'github-dark', light: 'github-light' },
    transformers: [
      {
        pre(node) {
          node.properties.class =
            'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none !bg-transparent'
        },
        code(node) {
          node.properties['data-line-numbers'] = ''
        },
        line(node) {
          node.properties['data-line'] = ''
        },
      },
    ],
  })
}

function readFile(src: string): string {
  const abs = path.isAbsolute(src) ? src : path.join(CWD, src)
  try {
    return fs.readFileSync(abs, 'utf-8')
  } catch {
    console.warn(`  ⚠ missing: ${src}`)
    return ''
  }
}

function buildTree(files: { target: string }[]) {
  const root: unknown[] = []
  for (const file of files) {
    const parts = file.target.split('/')
    let nodes = root as { name: string; path?: string; children?: unknown[] }[]
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLast = i === parts.length - 1
      let node = nodes.find((n) => n.name === part)
      if (!node) {
        node = isLast ? { name: part, path: file.target } : { name: part, children: [] }
        nodes.push(node)
      }
      if (!isLast) nodes = node.children as typeof nodes
    }
  }
  return root
}

async function main() {
  console.log('Generating blocks data…')

  const categories = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const blocks = await Promise.all(
        cat.blocks.map(async (block) => {
          // Deduplicate by target path
          const seen = new Set<string>()
          const uniqueFiles = block.files.filter((f) => {
            if (seen.has(f.target)) return false
            seen.add(f.target)
            return true
          })

          const resolvedFiles = await Promise.all(
            uniqueFiles.map(async (f) => {
              const content = readFile(f.src)
              const ext = f.target.split('.').pop() ?? 'tsx'
              const lang = ext === 'ts' ? 'typescript' : 'tsx'
              const highlightedContent = content ? await highlight(content, lang) : ''
              return { target: f.target, content, highlightedContent }
            }),
          )

          const tree = buildTree(resolvedFiles.filter((f) => f.content))

          return {
            name: block.name,
            description: block.description,
            iframeHeight: block.iframeHeight,
            files: resolvedFiles.filter((f) => f.content),
            tree,
          }
        }),
      )
      return { id: cat.id, label: cat.label, blocks }
    }),
  )

  const json = JSON.stringify(categories, null, 2)
  const output = `// AUTO-GENERATED — do not edit manually.
// Run: bun scripts/generate-blocks-data.ts
// biome-ignore-all lint: generated file
/* eslint-disable */

export type GeneratedFile = {
  target: string
  content: string
  highlightedContent: string
}

export type GeneratedTree = {
  name: string
  path?: string
  children?: GeneratedTree[]
}

export type GeneratedBlock = {
  name: string
  description: string
  iframeHeight?: string
  files: GeneratedFile[]
  tree: GeneratedTree[]
}

export type GeneratedCategory = {
  id: string
  label: string
  blocks: GeneratedBlock[]
}

export const BLOCKS_DATA: GeneratedCategory[] = ${json}
`

  fs.writeFileSync(OUT, output, 'utf-8')
  console.log(`✓ Written to lib/__blocks-generated__.ts`)

  // Summary
  let totalBlocks = 0
  let totalFiles = 0
  for (const cat of categories) {
    for (const block of cat.blocks) {
      totalBlocks++
      totalFiles += block.files.length
    }
  }
  console.log(`  ${categories.length} categories, ${totalBlocks} blocks, ${totalFiles} files`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
