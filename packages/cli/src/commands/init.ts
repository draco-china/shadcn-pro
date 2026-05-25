import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'

const DEFAULT_CONFIG = {
  registry: 'https://raw.githubusercontent.com/draco-china/shadcn-pro/main/packages/registry',
  componentsDir: 'src/components/pro',
  typescript: true,
}

/**
 * Initialize shadcn-pro in the current project.
 * Creates a shadcn-pro.json configuration file.
 */
export async function init(): Promise<void> {
  p.intro(pc.bgCyan(pc.black(' shadcn-pro ')))

  const configPath = path.join(process.cwd(), 'shadcn-pro.json')

  if (existsSync(configPath)) {
    const overwrite = await p.confirm({
      message: 'shadcn-pro.json already exists. Overwrite?',
      initialValue: false,
    })
    if (!overwrite || p.isCancel(overwrite)) {
      p.cancel('Cancelled.')
      return
    }
  }

  const componentsDir = await p.text({
    message: 'Where should components be installed?',
    placeholder: DEFAULT_CONFIG.componentsDir,
    defaultValue: DEFAULT_CONFIG.componentsDir,
  })

  if (p.isCancel(componentsDir)) {
    p.cancel('Cancelled.')
    return
  }

  const config = {
    ...DEFAULT_CONFIG,
    componentsDir: componentsDir || DEFAULT_CONFIG.componentsDir,
  }

  writeFileSync(configPath, JSON.stringify(config, null, 2))

  p.outro(pc.green('✓ Created shadcn-pro.json'))
}
