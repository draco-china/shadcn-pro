import type { DescriptionsItem } from './types'

export function getDescriptionItemKey(item: DescriptionsItem, index: number) {
  if (item.key !== undefined) return item.key
  if (typeof item.label === 'string' || typeof item.label === 'number') return item.label
  return index
}
