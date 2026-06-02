import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'

interface RegistryItem {
  name: string
  private?: boolean
  dependencies?: string[]
  registryDependencies?: string[]
  files?: string[]
}

interface Registry {
  components: RegistryItem[]
}

const registryRoot = resolve(import.meta.dir, '..')
const repoRoot = resolve(registryRoot, '..', '..')
const proRegistryRoot = join(registryRoot, 'pro')
const docsRegistryRoot = join(repoRoot, 'apps/docs/registry/new-york-v4')
const docsComponentsRoot = join(repoRoot, 'apps/docs/content/docs/components')
const docsExamplesRoot = join(repoRoot, 'apps/docs/registry/new-york-v4/examples')
const docsExamplesIndex = join(repoRoot, 'apps/docs/examples/__index__.ts')
const docsMetaPath = join(docsComponentsRoot, 'meta.json')
const registry = JSON.parse(readFileSync(join(registryRoot, 'registry.json'), 'utf8')) as Registry

const expectedComponents = [
  'pro-base',
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
const publicComponents = components.filter((component) => !component.private)
const publicComponentNames = publicComponents.map((component) => component.name)
const fileOwners = new Map<string, Set<string>>()
const failures: string[] = []
const allowedDuplicateFileOwners = new Map(
  [
    'pro/base/fields/shared/field.tsx',
    'pro/base/fields/shared/classes.ts',
    'pro/base/fields/shared/change-event.ts',
    'pro/base/fields/shared/select.tsx',
    'pro/base/fields/shared/select-classes.ts',
    'pro/base/fields/shared/select-content.tsx',
    'pro/base/fields/shared/select-item.tsx',
    'pro/base/fields/input/index.tsx',
    'pro/base/fields/input/affix.tsx',
    'pro/base/fields/input/affix-types.ts',
    'pro/base/fields/input/classes.ts',
    'pro/base/fields/input/clear.ts',
    'pro/base/fields/input/types.ts',
    'pro/base/fields/input/affix-utils.ts',
    'pro/base/fields/input/affix-value.ts',
    'pro/base/fields/input/affix-select.tsx',
    'pro/base/fields/input/use-affix-selection.ts',
    'pro/base/fields/input/use-input-affix.ts',
    'pro/base/fields/input/use-input-value.ts',
    'pro/base/fields/password/index.tsx',
    'pro/base/fields/password/types.ts',
  ].map((file) => [file, new Set(['pro-fields', 'pro-input'])]),
)

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

function sourceFilesIn(dir: string, extensions: string[]) {
  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...sourceFilesIn(fullPath, extensions))
      continue
    }
    if (extensions.some((extension) => entry.name.endsWith(extension))) {
      files.push(fullPath)
    }
  }
  return files
}

function registryRelativePath(filePath: string) {
  return normalize(filePath).replace(`${normalize(registryRoot)}/`, '')
}

function includesDecoratedObjectFieldComponent(content: string) {
  return [...content.matchAll(/<SchemaField\.Object[\s\S]*?>/g)].some((match) => {
    const tag = match[0]
    return tag.includes('x-component="ObjectField"') && tag.includes('x-decorator="FormItem"')
  })
}

function includesDuplicateClearPointerHandler(content: string) {
  return (
    (content.includes('onPointerDown={handleClear}') &&
      content.includes('onClick={handleClear}')) ||
    (content.includes('onPointerDown={onClear}') && content.includes('onClick={onClear}'))
  )
}

for (const name of expectedComponents) {
  if (!publicComponentNames.includes(name)) fail(`Missing public component: ${name}`)
}

for (const name of removedComponents) {
  if (componentNames.includes(name)) fail(`Removed component is still public: ${name}`)
}

if (publicComponentNames.length !== expectedComponents.length) {
  fail(
    `Expected ${expectedComponents.length} public components, found ${publicComponentNames.length}`,
  )
}

for (const component of components) {
  if (!component.files?.length) fail(`${component.name} has no files`)
  for (const file of component.files ?? []) {
    const owners = fileOwners.get(file) ?? new Set<string>()
    owners.add(component.name)
    fileOwners.set(file, owners)
  }
}

for (const [file, owners] of fileOwners) {
  if (owners.size <= 1) continue

  const allowedOwners = allowedDuplicateFileOwners.get(file)
  const ownerList = [...owners].sort()
  const allowedOwnerList = [...(allowedOwners ?? [])].sort()
  if (
    !allowedOwners ||
    ownerList.length !== allowedOwnerList.length ||
    ownerList.some((owner, index) => owner !== allowedOwnerList[index])
  ) {
    fail(`${file} is listed by multiple components: ${ownerList.join(', ')}`)
  }
}

const listedProFiles = new Set([...fileOwners.keys()].filter((file) => file.startsWith('pro/')))
const actualProFiles = new Set(
  sourceFilesIn(proRegistryRoot, sourceExtensions).map(registryRelativePath),
)

for (const file of actualProFiles) {
  if (!listedProFiles.has(file)) fail(`Pro source file is not listed in registry: ${file}`)
}

for (const file of listedProFiles) {
  if (!actualProFiles.has(file)) fail(`Listed Pro registry file does not exist: ${file}`)
}

const meta = JSON.parse(readFileSync(docsMetaPath, 'utf8')) as {
  pages: string[]
}
const examplesIndex = readFileSync(docsExamplesIndex, 'utf8')

for (const component of components) {
  const dependencies = toSet(component.dependencies)
  const registryDependencies = toSet(component.registryDependencies)

  if (!component.private) {
    if (!existsSync(join(docsComponentsRoot, `${component.name}.mdx`))) {
      fail(`${component.name} is missing docs page`)
    }
    if (!meta.pages.includes(component.name)) {
      fail(`${component.name} is missing from docs components meta`)
    }
    if (!examplesIndex.includes(`${component.name}-demo`)) {
      fail(`${component.name} is missing a default demo entry`)
    }
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
    if (includesDuplicateClearPointerHandler(content)) {
      fail(`${component.name} uses duplicate pointer/click clear handlers in ${file}`)
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

for (const file of [
  ...sourceFilesIn(docsExamplesRoot, ['.tsx']),
  ...sourceFilesIn(docsComponentsRoot, ['.mdx']),
]) {
  if (includesDecoratedObjectFieldComponent(readFileSync(file, 'utf8'))) {
    fail(`SchemaField.Object with ObjectField must not use FormItem decorator: ${file}`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log(`Validated ${components.length} registry components.`)
