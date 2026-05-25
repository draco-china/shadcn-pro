'use server'

import { type RegistryItem, registryItemSchema } from 'shadcn/schema'

export async function getAllBlockIds(
  types: RegistryItem['type'][] = ['registry:block', 'registry:internal'],
  categories: string[] = [],
): Promise<string[]> {
  const blocks = await getAllBlocks(types, categories)

  return blocks.map((block) => block.name)
}

export async function getAllBlocks(
  types: RegistryItem['type'][] = ['registry:block', 'registry:internal'],
  categories: string[] = [],
) {
  const { Index: StylesIndex } = await import('@/registry/__index__')

  const allBlocks = new Map<string, RegistryItem>()

  for (const style in StylesIndex) {
    const styleIndex = StylesIndex[style]
    if (typeof styleIndex !== 'object' || styleIndex === null) {
      continue
    }

    for (const itemName in styleIndex) {
      const item = styleIndex[itemName]
      const result = registryItemSchema.safeParse(item)
      if (result.success) {
        const block = result.data as RegistryItem
        allBlocks.set(`${block.type}:${block.name}`, block)
      }
    }
  }

  const validatedBlocks = Array.from(allBlocks.values())

  return validatedBlocks.filter(
    (block) =>
      types.includes(block.type) &&
      (categories.length === 0 ||
        block.categories?.some((category: string) => categories.includes(category))) &&
      !block.name.startsWith('chart-'),
  )
}
