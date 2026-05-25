export type {
  GeneratedBlock as ResolvedBlock,
  GeneratedCategory as ResolvedCategory,
} from './__blocks-generated__'
export { BLOCKS_DATA as CATEGORIES } from './__blocks-generated__'

export async function buildCategories() {
  const { BLOCKS_DATA } = await import('./__blocks-generated__')
  return BLOCKS_DATA
}

export async function buildCategory(id: string) {
  const { BLOCKS_DATA } = await import('./__blocks-generated__')
  return BLOCKS_DATA.find((c) => c.id === id) ?? null
}
