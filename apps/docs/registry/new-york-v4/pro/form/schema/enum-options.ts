export function normalizeEnumOptions(items: unknown[]) {
  return items.map((item) =>
    typeof item === 'object' && item !== null && 'value' in item
      ? { ...item, value: String(item.value) }
      : { label: String(item), value: String(item) },
  )
}
