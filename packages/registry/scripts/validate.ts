import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'
import { CATEGORIES } from '../../../apps/docs/lib/blocks-categories'

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
const docsRoot = join(repoRoot, 'apps/docs')
const proRegistryRoot = join(registryRoot, 'pro')
const docsRegistryRoot = join(repoRoot, 'apps/docs/registry/new-york-v4')
const docsExamplesRoot = join(docsRegistryRoot, 'examples')
const docsComponentsRoot = join(repoRoot, 'apps/docs/content/docs/components')
const docsExamplesIndex = join(repoRoot, 'apps/docs/examples/__index__.ts')
const docsRegistryIndexPath = join(repoRoot, 'apps/docs/registry/__index__.tsx')
const docsInstallationPath = join(repoRoot, 'apps/docs/content/docs/installation.mdx')
const docsMetaPath = join(docsComponentsRoot, 'meta.json')
const registry = JSON.parse(readFileSync(join(registryRoot, 'registry.json'), 'utf8')) as Registry

const removedComponents = [
  'code-toolbar',
  'markdown-toolbar',
  'pro-chat',
  'pro-layout',
  'richtext-toolbar',
]
const ignoredPackages = new Set(['react', 'react-dom'])
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx']
const thinModuleFileName = /(^|\/)(?:class|type|variant)(?:es|s)?\.[tj]sx?$/
const bannedProSourcePatterns = [
  {
    pattern: new RegExp(String.raw`\b${['ProTable', 'DensityButton'].join('')}\b`),
    message: 'inline the density dropdown inside ProTableToolbar',
  },
  {
    pattern: new RegExp(String.raw`\b${['ProTable', 'ColumnSettingsButton'].join('')}\b`),
    message: 'inline the columns dropdown trigger inside ProTableToolbar',
  },
  {
    pattern: new RegExp(String.raw`\b${['use', 'ImageViewer'].join('')}\b`),
    message: 'keep ImageViewer state colocated in the component',
  },
] as const

const components = registry.components
const componentNames = components.map((component) => component.name)
const publicComponents = components.filter((component) => !component.private)
const publicComponentNames = publicComponents.map((component) => component.name)
const fileOwners = new Map<string, Set<string>>()
const requiredRegistryDependencies = new Map<string, Set<string>>()
const failures: string[] = []

function fail(message: string) {
  failures.push(message)
}

function toSet(values?: string[]) {
  return new Set(values ?? [])
}

function sortedValues(values: Set<string>) {
  return [...values].sort()
}

function sameSet(a: Set<string>, b: Set<string>) {
  if (a.size !== b.size) return false
  for (const value of a) {
    if (!b.has(value)) return false
  }
  return true
}

function formatSet(values: Set<string>) {
  return sortedValues(values).join(', ') || '-'
}

function addRequiredRegistryDependency(componentName: string, dependencyName: string) {
  const dependencies = requiredRegistryDependencies.get(componentName) ?? new Set<string>()
  dependencies.add(dependencyName)
  requiredRegistryDependencies.set(componentName, dependencies)
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

function docsPackageDependencies(content: string) {
  return new Set(
    [...content.matchAll(/bun add ([^\n]+)/g)]
      .flatMap((match) => match[1].trim().split(/\s+/))
      .filter(Boolean),
  )
}

function docsRegistryDependencies(content: string) {
  const installLines = content
    .split('\n')
    .filter((line) => line.includes('Install or copy'))
    .join('\n')
  return new Set([...installLines.matchAll(/`([^`]+)`/g)].map((match) => match[1]))
}

function componentPreviewNames(content: string) {
  return [...content.matchAll(/<ComponentPreview\s+name=["']([^"']+)["']/g)].map(
    (match) => match[1],
  )
}

function examplesIndexNames(content: string) {
  return [...content.matchAll(/'([^']+)': \{\n\s+name: '[^']+'/g)].map((match) => match[1])
}

function examplesIndexEntries(content: string) {
  return [...content.matchAll(/^ {4}'([^']+)': \{([\s\S]*?)\n {4}\},/gm)].map((match) => {
    const body = match[2]
    return {
      key: match[1],
      name: body.match(/name: '([^']+)'/)?.[1],
      fileName: body.match(/filePath: 'registry\/new-york-v4\/examples\/([^']+)\.tsx'/)?.[1],
      importName: body.match(/@\/registry\/new-york-v4\/examples\/([^']+)'/)?.[1],
    }
  })
}

function docsIndexFilesFor(content: string, componentName: string) {
  const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = content.match(
    new RegExp(`"${escapedName}": \\{[\\s\\S]*?files: \\[([\\s\\S]*?)\\],`, 'm'),
  )
  if (!match) return undefined

  return new Set(
    [...match[1].matchAll(/path: "registry\/new-york-v4\/([^"]+)"/g)].map((file) => file[1]),
  )
}

function docsIndexComponentNames(content: string) {
  return [...content.matchAll(/"([^"]+)": \{\n\s+name: "[^"]+"/g)].map((match) => match[1])
}

function installationTableDependencies(content: string, componentName: string) {
  const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = content.match(new RegExp(`\\| \`${escapedName}\` \\| ([^|]+) \\|`))
  if (!match) return undefined

  const cell = match[1].trim()
  const [packageCell, registryCell = ''] = cell.split(' plus ')
  const packageText = packageCell.trim().replace(/^`|`$/g, '')
  const packages =
    packageText === 'None' ? [] : packageText.split(/\s+/).filter((value) => value !== 'and')

  return {
    dependencies: new Set(packages),
    registryDependencies: new Set(
      [...registryCell.matchAll(/`([^`]+)`/g)].map((registryDependency) => registryDependency[1]),
    ),
  }
}

function installationTableComponentNames(content: string) {
  return [...content.matchAll(/\| `([^`]+)` \| [^|]+ \|/g)].map((match) => match[1])
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

function includesDuplicateClearPointerHandler(content: string) {
  return (
    (content.includes('onPointerDown={handleClear}') &&
      content.includes('onClick={handleClear}')) ||
    (content.includes('onPointerDown={onClear}') && content.includes('onClick={onClear}'))
  )
}

function includesLocalBarrelExport(content: string) {
  return /export\s+(?:type\s+)?(?:\*|\{[^}]*\})\s+from\s+['"]\./.test(content)
}

function dependencyCycles(files: Set<string>) {
  const graph = new Map<string, string[]>()
  for (const file of files) {
    const content = readFileSync(join(registryRoot, file), 'utf8')
    const dependencies = importsFor(content)
      .filter((specifier) => specifier.startsWith('.'))
      .flatMap((specifier) => {
        const resolved = resolveRelativeImport(file, specifier)
        return resolved && files.has(resolved) ? [resolved] : []
      })
    graph.set(file, dependencies)
  }

  const cycles: string[][] = []
  const visiting = new Set<string>()
  const visited = new Set<string>()
  const stack: string[] = []

  function visit(file: string) {
    if (visiting.has(file)) {
      const start = stack.indexOf(file)
      cycles.push([...stack.slice(start), file])
      return
    }
    if (visited.has(file)) return

    visiting.add(file)
    stack.push(file)
    for (const dependency of graph.get(file) ?? []) visit(dependency)
    stack.pop()
    visiting.delete(file)
    visited.add(file)
  }

  for (const file of files) visit(file)
  return cycles
}

const meta = JSON.parse(readFileSync(docsMetaPath, 'utf8')) as {
  pages: string[]
}

for (const name of removedComponents) {
  if (componentNames.includes(name)) fail(`Removed component is still public: ${name}`)
}

for (const name of publicComponentNames) {
  if (!meta.pages.includes(name)) fail(`${name} is missing from docs components meta`)
}

for (const name of meta.pages) {
  if (!publicComponentNames.includes(name)) fail(`${name} is listed in docs meta but not registry`)
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

  const ownerList = [...owners].sort()
  fail(`${file} is listed by multiple components: ${ownerList.join(', ')}`)
}

const listedProFiles = new Set([...fileOwners.keys()].filter((file) => file.startsWith('pro/')))
const actualProFiles = new Set(
  sourceFilesIn(proRegistryRoot, sourceExtensions).map(registryRelativePath),
)
const docsProFiles = new Set(
  sourceFilesIn(join(docsRegistryRoot, 'pro'), sourceExtensions).map((file) =>
    normalize(file).replace(`${normalize(docsRegistryRoot)}/`, ''),
  ),
)

for (const file of actualProFiles) {
  if (!listedProFiles.has(file)) fail(`Pro source file is not listed in registry: ${file}`)
  if (thinModuleFileName.test(file)) {
    fail(`${file} should be folded into the component file that uses it`)
  }
}

for (const file of listedProFiles) {
  if (!actualProFiles.has(file)) fail(`Listed Pro registry file does not exist: ${file}`)
}

for (const file of actualProFiles) {
  if (!docsProFiles.has(file)) fail(`Docs registry is missing Pro file: ${file}`)
}

for (const file of docsProFiles) {
  if (!actualProFiles.has(file)) fail(`Docs registry has stale Pro file: ${file}`)
}

for (const cycle of dependencyCycles(actualProFiles)) {
  fail(`Pro registry has circular dependency: ${cycle.join(' -> ')}`)
}

const examplesIndex = readFileSync(docsExamplesIndex, 'utf8')
const docsRegistryIndex = readFileSync(docsRegistryIndexPath, 'utf8')
const docsInstallation = readFileSync(docsInstallationPath, 'utf8')
const docsRegistryIndexComponentNames = docsIndexComponentNames(docsRegistryIndex)
const docsInstallationComponentNames = installationTableComponentNames(docsInstallation)
const exampleFileNames = new Set(
  sourceFilesIn(docsExamplesRoot, ['.tsx']).map((file) =>
    file.replace(`${docsExamplesRoot}/`, '').replace(/\.tsx$/, ''),
  ),
)
const indexedExampleNameList = examplesIndexNames(examplesIndex)
const indexedExampleEntries = examplesIndexEntries(examplesIndex)
const indexedExampleNames = new Set(indexedExampleNameList)
const documentedExampleNames = new Set<string>()
const categoryIds = new Set<string>()
const blockExampleNames = new Set<string>()
const blockProFiles = new Set<string>()
const publicProFiles = new Set(
  publicComponents.flatMap((component) =>
    (component.files ?? []).filter((file) => file.startsWith('pro/')),
  ),
)

for (const name of docsRegistryIndexComponentNames) {
  if (!name.startsWith('pro-') && !name.endsWith('-viewer')) continue
  if (!componentNames.includes(name))
    fail(`${name} is listed in docs registry index but not registry`)
}

for (const name of docsInstallationComponentNames) {
  if (!name.startsWith('pro-') && !name.endsWith('-viewer')) continue
  if (!publicComponentNames.includes(name))
    fail(`${name} is listed in installation dependency table but not public registry`)
}

for (const [index, name] of indexedExampleNameList.entries()) {
  if (indexedExampleNameList.indexOf(name) !== index) {
    fail(`Duplicate example index entry: ${name}`)
  }
}

if (indexedExampleEntries.length !== indexedExampleNameList.length) {
  fail('Examples index has entries that do not match the expected shape')
}

for (const entry of indexedExampleEntries) {
  if (entry.name !== entry.key) {
    fail(`${entry.key} example index name mismatch: ${entry.name}`)
  }
  if (entry.fileName !== entry.key) {
    fail(`${entry.key} example index filePath mismatch: ${entry.fileName}`)
  }
  if (entry.importName !== entry.key) {
    fail(`${entry.key} example index import mismatch: ${entry.importName}`)
  }
}

for (const category of CATEGORIES) {
  if (categoryIds.has(category.id)) fail(`Duplicate block category id: ${category.id}`)
  categoryIds.add(category.id)

  for (const block of category.blocks) {
    if (blockExampleNames.has(block.name)) fail(`Duplicate block name: ${block.name}`)
    blockExampleNames.add(block.name)

    const blockTargets = new Set<string>()
    for (const file of block.files) {
      if (blockTargets.has(file.target)) {
        fail(`${block.name} has duplicate block file: ${file.target}`)
      }
      blockTargets.add(file.target)

      const sourcePath = join(docsRoot, file.src)
      if (!existsSync(sourcePath)) fail(`${block.name} block source does not exist: ${file.src}`)
      if (file.target.startsWith('examples/')) continue

      blockProFiles.add(file.target)
      if (!listedProFiles.has(`pro/${file.target}`)) {
        fail(`${block.name} block file is not listed in registry: ${file.target}`)
      }
    }
  }
}

for (const file of listedProFiles) {
  if (!publicProFiles.has(file)) continue

  const blockTarget = file.replace(/^pro\//, '')
  if (!blockProFiles.has(blockTarget))
    fail(`Public Pro registry file is missing from blocks: ${blockTarget}`)
}

for (const file of sourceFilesIn(docsComponentsRoot, ['.mdx'])) {
  const content = readFileSync(file, 'utf8')
  for (const name of componentPreviewNames(content)) documentedExampleNames.add(name)
}

for (const name of indexedExampleNames) {
  if (!exampleFileNames.has(name)) fail(`${name} is listed in examples index but has no file`)
  if (documentedExampleNames.has(name) || blockExampleNames.has(name)) continue
  fail(`${name} is listed in examples index but is not used by docs previews or blocks`)
}

for (const name of exampleFileNames) {
  if (!indexedExampleNames.has(name)) fail(`${name} has an example file but is missing from index`)
  if (documentedExampleNames.has(name) || blockExampleNames.has(name)) continue
  fail(`${name} has an example file but is not used by docs previews or blocks`)
}

for (const component of components) {
  const dependencies = toSet(component.dependencies)
  const registryDependencies = toSet(component.registryDependencies)
  const docsIndexFiles = docsIndexFilesFor(docsRegistryIndex, component.name)
  const installationDependencies = installationTableDependencies(docsInstallation, component.name)
  const registryFiles = toSet(component.files)

  if (installationDependencies === undefined) {
    fail(`${component.name} is missing from installation dependency table`)
  } else {
    if (!sameSet(installationDependencies.dependencies, dependencies)) {
      fail(
        `${component.name} installation package dependencies mismatch: expected ${formatSet(dependencies)}, found ${formatSet(installationDependencies.dependencies)}`,
      )
    }
    if (!sameSet(installationDependencies.registryDependencies, registryDependencies)) {
      fail(
        `${component.name} installation registry dependencies mismatch: expected ${formatSet(registryDependencies)}, found ${formatSet(installationDependencies.registryDependencies)}`,
      )
    }
  }

  if (docsIndexFiles === undefined) {
    fail(`${component.name} is missing from docs registry index`)
  } else if (!sameSet(docsIndexFiles, registryFiles)) {
    fail(
      `${component.name} docs registry index files mismatch: expected ${formatSet(registryFiles)}, found ${formatSet(docsIndexFiles)}`,
    )
  }

  if (!component.private) {
    const docsPath = join(docsComponentsRoot, `${component.name}.mdx`)
    if (!existsSync(docsPath)) {
      fail(`${component.name} is missing docs page`)
    } else {
      const docsContent = readFileSync(docsPath, 'utf8')
      const documentedDependencies = docsPackageDependencies(docsContent)
      const documentedRegistryDependencies = docsRegistryDependencies(docsContent)

      if (!sameSet(documentedDependencies, dependencies)) {
        fail(
          `${component.name} docs package dependencies mismatch: expected ${formatSet(dependencies)}, found ${formatSet(documentedDependencies)}`,
        )
      }
      if (!sameSet(documentedRegistryDependencies, registryDependencies)) {
        fail(
          `${component.name} docs registry dependencies mismatch: expected ${formatSet(registryDependencies)}, found ${formatSet(documentedRegistryDependencies)}`,
        )
      }
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
    if (includesDuplicateClearPointerHandler(content)) {
      fail(`${component.name} uses duplicate pointer/click clear handlers in ${file}`)
    }
    if (includesLocalBarrelExport(content)) {
      fail(`${component.name} uses a local barrel export in ${file}`)
    }
    for (const banned of bannedProSourcePatterns) {
      if (banned.pattern.test(content)) fail(`${component.name} should ${banned.message}: ${file}`)
    }

    for (const specifier of importsFor(content)) {
      if (specifier.startsWith('@/components/ui/')) {
        const uiName = specifier.replace('@/components/ui/', '')
        addRequiredRegistryDependency(component.name, uiName)
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
        if (owners?.size) {
          for (const owner of owners) addRequiredRegistryDependency(component.name, owner)
        }
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

for (const component of components) {
  const required = requiredRegistryDependencies.get(component.name) ?? new Set<string>()
  const declared = toSet(component.registryDependencies)
  for (const dependency of declared) {
    if (!required.has(dependency)) {
      fail(`${component.name} declares unused registry dependency ${dependency}`)
    }
  }
}

for (const name of removedComponents) {
  const activeText = [
    readFileSync(join(registryRoot, 'registry.json'), 'utf8'),
    readFileSync(docsMetaPath, 'utf8'),
    readFileSync(docsExamplesIndex, 'utf8'),
    readFileSync(docsRegistryIndexPath, 'utf8'),
    ...sourceFilesIn(docsComponentsRoot, ['.mdx']).map((file) => readFileSync(file, 'utf8')),
  ].join('\n')
  if (activeText.includes(name)) fail(`Removed component still referenced: ${name}`)
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log(`Validated ${components.length} registry components.`)
