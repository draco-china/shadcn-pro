import pc from 'picocolors'
import type { RegistryComponent } from '../registry.js'
import { fetchRegistry } from '../registry.js'

/**
 * List all available components from the registry.
 *
 * @param options - CLI options including optional category filter.
 */
export async function list(options: { category?: string }): Promise<void> {
  const registry = await fetchRegistry()

  if (!registry) {
    console.error(pc.red('Failed to fetch registry'))
    process.exit(1)
  }

  let components = registry.components
  if (options.category) {
    components = components.filter((c) => c.category === options.category)
  }

  const byCategory = components.reduce(
    (acc, c) => {
      if (!acc[c.category]) acc[c.category] = []
      acc[c.category].push(c)
      return acc
    },
    {} as Record<string, RegistryComponent[]>,
  )

  for (const [category, items] of Object.entries(byCategory)) {
    console.log(pc.bold(pc.cyan(`\n${category}/`)))
    for (const item of items) {
      console.log(`  ${pc.green(item.name.padEnd(20))} ${pc.dim(item.description)}`)
    }
  }

  console.log()
}
