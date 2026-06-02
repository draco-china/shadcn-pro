import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { Registry, RegistryComponent } from '../registry.js'
import { fetchFile, fetchRegistry, loadConfig } from '../registry.js'

function unique<T>(values: T[]) {
  return [...new Set(values)]
}

function resolveComponentDependencies(
  registry: Registry,
  component: RegistryComponent,
  visited = new Set<string>(),
): {
  components: RegistryComponent[]
  shadcnDependencies: string[]
} {
  if (visited.has(component.name)) {
    return { components: [], shadcnDependencies: [] }
  }

  visited.add(component.name)

  const components: RegistryComponent[] = []
  const shadcnDependencies: string[] = []

  for (const dependencyName of component.registryDependencies ?? []) {
    const dependencyComponent = registry.components.find((item) => item.name === dependencyName)
    if (!dependencyComponent) {
      shadcnDependencies.push(dependencyName)
      continue
    }

    const resolved = resolveComponentDependencies(registry, dependencyComponent, visited)
    components.push(...resolved.components, dependencyComponent)
    shadcnDependencies.push(...resolved.shadcnDependencies)
  }

  return {
    components,
    shadcnDependencies,
  }
}

/**
 * Add a component to the project.
 *
 * @param componentName - Name of the registry component to install.
 * @param options - CLI options including optional custom output path.
 */
export async function add(componentName: string, options: { path?: string }): Promise<void> {
  p.intro(pc.bgCyan(pc.black(' shadcn-pro ')))

  const config = loadConfig()
  if (!config) {
    p.log.error('shadcn-pro.json not found. Run: npx @draco-china/shadcn-pro init')
    process.exit(1)
  }

  const s = p.spinner()
  s.start('Fetching registry...')
  const registry = await fetchRegistry(config.registry)
  if (!registry) {
    s.stop('Failed to fetch registry')
    process.exit(1)
  }
  s.stop('Registry loaded')

  const component = registry.components.find((c) => c.name === componentName)
  if (!component) {
    p.log.error(`Component "${componentName}" not found. Run: npx @draco-china/shadcn-pro list`)
    process.exit(1)
  }
  if (component.private) {
    p.log.error(`Component "${componentName}" is internal and cannot be installed directly.`)
    process.exit(1)
  }

  // Handle variants (e.g. editor engine selection)
  const selectedVariants: Record<string, string> = {}
  if (component.variants) {
    for (const [variantKey, variantOptions] of Object.entries(component.variants)) {
      const choices = Object.entries(variantOptions).map(([value, opt]) => ({
        value,
        label: opt.label,
      }))
      const selected = await p.select({
        message: `Select ${variantKey}:`,
        options: choices,
      })
      if (p.isCancel(selected)) {
        p.cancel('Cancelled.')
        return
      }
      selectedVariants[variantKey] = selected as string
    }
  }

  const resolvedDependencies = resolveComponentDependencies(registry, component)
  const componentsToInstall = unique([...resolvedDependencies.components, component])

  // Collect all files to download
  let filesToDownload = unique(componentsToInstall.flatMap((item) => item.files))
  let depsToInstall = unique(componentsToInstall.flatMap((item) => item.dependencies ?? []))
  const shadcnDependencies = unique(resolvedDependencies.shadcnDependencies)

  for (const [variantKey, selectedValue] of Object.entries(selectedVariants)) {
    const variantDef = component.variants?.[variantKey]?.[selectedValue]
    if (variantDef) {
      filesToDownload = unique([...filesToDownload, ...variantDef.files])
      depsToInstall = unique([...depsToInstall, ...variantDef.dependencies])
    }
  }

  // Show deps to install
  if (depsToInstall.length > 0) {
    p.log.info(pc.dim('Dependencies required:'))
    p.log.info(pc.dim(`  bun add ${depsToInstall.join(' ')}`))
  }

  if (shadcnDependencies.length) {
    p.log.info(pc.dim('shadcn/ui components required:'))
    p.log.info(pc.dim(`  npx shadcn add ${shadcnDependencies.join(' ')}`))
  }

  const confirm = await p.confirm({
    message: `Install ${pc.cyan(componentName)} to ${pc.dim(config.componentsDir)}?`,
  })
  if (!confirm || p.isCancel(confirm)) {
    p.cancel('Cancelled.')
    return
  }

  // Download files
  const outDir = options.path ?? path.join(process.cwd(), config.componentsDir)
  s.start('Downloading component files...')

  for (const file of filesToDownload) {
    const content = await fetchFile(registry.baseUrl, file)
    if (!content) {
      s.stop(`Failed to fetch ${file}`)
      process.exit(1)
    }
    const destPath = path.join(outDir, file)
    mkdirSync(path.dirname(destPath), { recursive: true })
    writeFileSync(destPath, content)
  }

  s.stop(`Downloaded ${filesToDownload.length} file(s)`)

  p.outro(pc.green(`✓ ${componentName} installed to ${config.componentsDir}`))
}
