#!/usr/bin/env bun
/**
 * scripts/gen-docs-meta.ts
 * Auto-generate apps/docs/content/docs/components/meta.json from registry structure.
 * Run: bun scripts/gen-docs-meta.ts
 *
 * Note: fumadocs meta.json pages[] only accepts strings — no separator objects.
 * Grouping is handled at the sidebar component level.
 */
import { readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const registryPro = join(root, 'packages/registry/pro')
const outFile = join(root, 'apps/docs/content/docs/components/meta.json')

// 1. Top-level pro component dirs (have index.tsx)
const proDirs = readdirSync(registryPro, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name.startsWith('pro-') && d.name !== 'pro-viewer')
  .map((d) => d.name)
  .sort()

// 2. pro-viewer sub-components (*-viewer.tsx)
const viewerDir = join(registryPro, 'pro-viewer')
const viewers = readdirSync(viewerDir)
  .filter((f) => f.endsWith('-viewer.tsx'))
  .map((f) => f.replace('.tsx', ''))
  .sort()

// fumadocs meta.json pages[] only supports strings — no separator objects
const meta = {
  title: 'Components',
  pages: [...proDirs, ...viewers],
}

writeFileSync(outFile, `${JSON.stringify(meta, null, 2)}\n`)
console.log('meta.json generated')
console.log('   Pro:', proDirs.join(', '))
console.log('   Viewers:', viewers.join(', '))
