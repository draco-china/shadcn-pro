import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import { fetchFile, fetchRegistry, loadConfig } from '../registry.js'

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

  // Collect all files to download
  let filesToDownload = [...component.files]
  let depsToInstall = [...(component.dependencies ?? [])]

  for (const [variantKey, selectedValue] of Object.entries(selectedVariants)) {
    const variantDef = component.variants?.[variantKey]?.[selectedValue]
    if (variantDef) {
      filesToDownload = [...filesToDownload, ...variantDef.files]
      depsToInstall = [...depsToInstall, ...variantDef.dependencies]
    }
  }

  // Show deps to install
  if (depsToInstall.length > 0) {
    p.log.info(pc.dim('Dependencies required:'))
    p.log.info(pc.dim(`  bun add ${depsToInstall.join(' ')}`))
  }

  if (component.registryDependencies?.length) {
    p.log.info(pc.dim('shadcn/ui components required:'))
    p.log.info(pc.dim(`  npx shadcn add ${component.registryDependencies.join(' ')}`))
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
    const destPath = path.join(outDir, file.replace('components/', ''))
    mkdirSync(path.dirname(destPath), { recursive: true })
    writeFileSync(destPath, content)
  }

  s.stop(`Downloaded ${filesToDownload.length} file(s)`)

  p.outro(pc.green(`✓ ${componentName} installed to ${config.componentsDir}`))
}
