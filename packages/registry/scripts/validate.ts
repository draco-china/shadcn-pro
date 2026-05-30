import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'

interface RegistryItem {
  name: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: string[]
}

interface Registry {
  components: RegistryItem[]
}

const registryRoot = resolve(import.meta.dir, '..')
const repoRoot = resolve(registryRoot, '..', '..')
const docsRegistryRoot = join(repoRoot, 'apps/docs/registry/new-york-v4')
const docsComponentsRoot = join(repoRoot, 'apps/docs/content/docs/components')
const docsExamplesIndex = join(repoRoot, 'apps/docs/examples/__index__.ts')
const docsMetaPath = join(docsComponentsRoot, 'meta.json')
const registry = JSON.parse(readFileSync(join(registryRoot, 'registry.json'), 'utf8')) as Registry

const expectedComponents = [
  'pro-fields',
  'pro-form',
  'pro-table',
  'pro-editor',
  'pro-descriptions',
  'pro-input',
  'code-viewer',
  'diff-viewer',
  'html-viewer',
  'image-viewer',
  'markdown-viewer',
]
const removedComponents = [
  'code-toolbar',
  'markdown-toolbar',
  'pro-chat',
  'pro-layout',
  'richtext-toolbar',
]
const ignoredPackages = new Set(['react', 'react-dom'])
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx']

const components = registry.components
const componentNames = components.map((component) => component.name)
const fileOwners = new Map<string, Set<string>>()
const failures: string[] = []

function fail(message: string) {
  failures.push(message)
}

function toSet(values?: string[]) {
  return new Set(values ?? [])
}

function withoutExtension(filePath: string) {
  return filePath.replace(/\.[^.]+$/, '')
}

function resolveRelativeImport(fromFile: string, specifier: string) {
  const base = normalize(join(dirname(fromFile), specifier))
  for (const extension of sourceExtensions) {
    const candidate = `${base}${extension}`
    if (existsSync(join(registryRoot, candidate))) return candidate
  }
  for (const extension of sourceExtensions) {
    const candidate = join(base, `index${extension}`)
    if (existsSync(join(registryRoot, candidate))) return normalize(candidate)
  }
  return undefined
}

function packageName(specifier: string) {
  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/')
    return `${scope}/${name}`
  }
  return specifier.split('/')[0]
}

function importsFor(content: string) {
  return [...content.matchAll(/from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g)].map(
    (match) => match[1] ?? match[2],
  )
}

function includesDeprecatedArrayFieldAdapterProps(content: string) {
  return (
    content.includes('onAdd=') ||
    content.includes('onRemove=') ||
    content.includes('onMoveUp=') ||
    content.includes('onMoveDown=')
  )
}

for (const name of expectedComponents) {
  if (!componentNames.includes(name)) fail(`Missing public component: ${name}`)
}

for (const name of removedComponents) {
  if (componentNames.includes(name)) fail(`Removed component is still public: ${name}`)
}

if (componentNames.length !== expectedComponents.length) {
  fail(`Expected ${expectedComponents.length} public components, found ${componentNames.length}`)
}

for (const component of components) {
  if (!component.files?.length) fail(`${component.name} has no files`)
  for (const file of component.files ?? []) {
    const owners = fileOwners.get(file) ?? new Set<string>()
    owners.add(component.name)
    fileOwners.set(file, owners)
  }
}

const meta = JSON.parse(readFileSync(docsMetaPath, 'utf8')) as {
  pages: string[]
}
const examplesIndex = readFileSync(docsExamplesIndex, 'utf8')

for (const component of components) {
  const dependencies = toSet(component.dependencies)
  const registryDependencies = toSet(component.registryDependencies)

  if (!existsSync(join(docsComponentsRoot, `${component.name}.mdx`))) {
    fail(`${component.name} is missing docs page`)
  }
  if (!meta.pages.includes(component.name)) {
    fail(`${component.name} is missing from docs components meta`)
  }
  if (!examplesIndex.includes(`${component.name}-demo`)) {
    fail(`${component.name} is missing a default demo entry`)
  }

  for (const file of component.files ?? []) {
    const sourcePath = join(registryRoot, file)
    const docsPath = join(docsRegistryRoot, file)
    if (!existsSync(sourcePath)) fail(`${component.name} file does not exist: ${file}`)
    if (!existsSync(docsPath)) fail(`${component.name} docs registry file does not exist: ${file}`)
    if (!existsSync(sourcePath)) continue

    const content = readFileSync(sourcePath, 'utf8')
    if (
      file.includes('/formily-fields/') &&
      content.includes('<ArrayField') &&
      includesDeprecatedArrayFieldAdapterProps(content)
    ) {
      fail(`${component.name} uses deprecated ArrayField adapter props in ${file}`)
    }

    for (const specifier of importsFor(content)) {
      if (specifier.startsWith('@/components/ui/')) {
        const uiName = specifier.replace('@/components/ui/', '')
        if (!registryDependencies.has(uiName)) {
          fail(
            `${component.name} imports ${specifier} but does not declare registry dependency ${uiName}`,
          )
        }
        continue
      }

      if (specifier.startsWith('.')) {
        const resolved = resolveRelativeImport(file, specifier)
        if (!resolved) continue
        if ((component.files ?? []).includes(resolved)) continue

        const owners = fileOwners.get(resolved)
        const declaredOwner = [...(owners ?? [])].find((owner) => registryDependencies.has(owner))
        if (owners?.size && !declaredOwner) {
          fail(
            `${component.name} imports ${resolved} from ${[...owners].join('/')} but does not declare it`,
          )
        } else if (!owners && !fileOwners.has(`${withoutExtension(resolved)}.tsx`)) {
          fail(`${component.name} imports unlisted local file ${resolved}`)
        }
        continue
      }

      if (specifier.startsWith('@/')) continue

      const dependency = packageName(specifier)
      if (!ignoredPackages.has(dependency) && !dependencies.has(dependency)) {
        fail(`${component.name} imports ${dependency} but does not declare it`)
      }
    }
  }
}

for (const name of removedComponents) {
  const activeText = [
    readFileSync(join(registryRoot, 'registry.json'), 'utf8'),
    readFileSync(docsMetaPath, 'utf8'),
    readFileSync(docsExamplesIndex, 'utf8'),
  ].join('\n')
  if (activeText.includes(name)) fail(`Removed component still referenced: ${name}`)
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log(`Validated ${components.length} registry components.`)
