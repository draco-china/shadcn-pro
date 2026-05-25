import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { BlockFile, FileTree } from '@/components/block-viewer'
import { highlightCode } from './highlight-code'

const BLOCKS_DIR = path.join(process.cwd(), 'app/view/blocks')

export async function getBlockFiles(blockName: string): Promise<{
  files: BlockFile[]
  tree: FileTree[]
}> {
  const blockDir = path.join(BLOCKS_DIR, blockName)

  async function walk(dir: string, base: string): Promise<BlockFile[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const results: BlockFile[] = []
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        results.push(...(await walk(full, base)))
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const content = await fs.readFile(full, 'utf-8')
        const relative = path.relative(base, full)
        const highlighted = await highlightCode(content, 'tsx')
        results.push({
          path: full,
          target: relative,
          content,
          highlightedContent: highlighted,
        })
      }
    }
    return results
  }

  const files = await walk(blockDir, blockDir)

  function buildTree(fileList: BlockFile[]): FileTree[] {
    const root: FileTree[] = []
    for (const file of fileList) {
      const parts = (file.target ?? '').split(path.sep)
      let nodes = root
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        const isLast = i === parts.length - 1
        let node = nodes.find((n) => n.name === part)
        if (!node) {
          node = isLast ? { name: part, path: file.target } : { name: part, children: [] }
          nodes.push(node)
        }
        if (!isLast) nodes = node.children ?? []
      }
    }
    return root
  }

  return { files, tree: buildTree(files) }
}
