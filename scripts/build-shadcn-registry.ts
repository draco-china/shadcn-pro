import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

const root = import.meta.dir.replace(/\/scripts$/, '')
const registryPath = join(root, 'packages/registry/registry.json')
const outDir = join(root, 'apps/docs/public/r')
const registryBaseUrl =
  process.env.SHADCN_PRO_REGISTRY_URL ?? 'https://draco-china.github.io/shadcn-pro/r'

interface RegistryComponent {
  name: string
  description?: string
  category?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: string[]
  private?: boolean
}

interface Registry {
  version: string
  components: RegistryComponent[]
}

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf8')) as T
}

function registryDependency(name: string, componentNames: Set<string>) {
  return componentNames.has(name) ? `${registryBaseUrl}/${name}.json` : name
}

function fileType(file: string) {
  return basename(file).startsWith('use-') ? 'registry:hook' : 'registry:component'
}

const registry = readJson<Registry>(registryPath)
const publicComponents = registry.components.filter((component) => !component.private)
const componentNames = new Set(publicComponents.map((component) => component.name))
const generatedFiles: string[] = []

mkdirSync(outDir, { recursive: true })

for (const component of publicComponents) {
  const item = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: component.name,
    type: 'registry:component',
    title: component.name,
    description: component.description,
    author: 'draco-china <https://github.com/draco-china>',
    dependencies: component.dependencies ?? [],
    registryDependencies: (component.registryDependencies ?? []).map((dependency) =>
      registryDependency(dependency, componentNames),
    ),
    files: component.files.map((file) => ({
      path: `packages/registry/${file}`,
      content: readFileSync(join(root, 'packages/registry', file), 'utf8'),
      type: fileType(file),
      target: `@components/${file}`,
    })),
    categories: component.category ? [component.category] : undefined,
    meta: {
      version: registry.version,
      docs: `https://draco-china.github.io/shadcn-pro/docs/components/${component.name}`,
    },
  }

  const outPath = join(outDir, `${component.name}.json`)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, `${JSON.stringify(item, null, 2)}\n`)
  generatedFiles.push(outPath)
}

const index = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'shadcn-pro',
  homepage: 'https://draco-china.github.io/shadcn-pro',
  items: publicComponents.map((component) => ({
    name: component.name,
    type: 'registry:component',
    title: component.name,
    description: component.description,
    categories: component.category ? [component.category] : undefined,
  })),
}

const indexPath = join(outDir, 'shadcn-pro.json')
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`)
generatedFiles.push(indexPath)

const formatResult = spawnSync('bunx', ['biome', 'format', '--write', ...generatedFiles], {
  stdio: 'inherit',
})

if (formatResult.status !== 0) {
  process.exit(formatResult.status ?? 1)
}

console.log(`Built ${publicComponents.length} shadcn registry item(s).`)
