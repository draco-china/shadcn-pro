import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const version = process.argv[2]

if (!version) {
  console.error('Usage: bun scripts/update-registry-version.ts <version>')
  process.exit(1)
}

const root = import.meta.dir.replace(/\/scripts$/, '')

for (const file of ['package.json', 'packages/registry/registry.json']) {
  const filePath = join(root, file)
  const json = JSON.parse(readFileSync(filePath, 'utf8')) as { version?: string }
  json.version = version
  writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`)
}
