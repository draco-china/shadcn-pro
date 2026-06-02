import type { CascaderOption } from './types'

export function getCascaderLabel(
  options: CascaderOption[] | undefined,
  path: string[] | undefined,
): string {
  if (!options || !path?.length) return ''

  return getCascaderLabels(options, path).join(' / ')
}

function getCascaderLabels(options: CascaderOption[], path: string[]): string[] {
  const [value, ...restPath] = path
  const option = options.find((item) => item.value === value)
  if (!option) return []
  if (!restPath.length) return [option.label]

  return [option.label, ...getCascaderLabels(option.children ?? [], restPath)]
}
