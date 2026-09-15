import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const version = process.argv[2]

interface VersionedManifest {
  version?: string
}

if (!version) {
  console.error('Usage: bun scripts/update-registry-version.ts <version>')
  process.exit(1)
}

const root = import.meta.dir.replace(/\/scripts$/, '')

const manifests = ['package.json', 'packages/registry/registry.json']

for (const file of manifests) {
  const filePath = join(root, file)
  const json = JSON.parse(readFileSync(filePath, 'utf8')) as VersionedManifest
  json.version = version
  writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`)
}

execFileSync(join(root, 'node_modules/.bin/biome'), ['format', '--write', ...manifests], {
  cwd: root,
  stdio: 'inherit',
})
