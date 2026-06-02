import type { TreeSelectOption } from './types'

export function getTreeSelectLabels(
  options: TreeSelectOption[] | undefined,
  values: string[] | undefined,
): string {
  if (!options || !values?.length) return ''

  return getSelectedTreeLabels(options, new Set(values)).join(', ')
}

function getSelectedTreeLabels(options: TreeSelectOption[], selectedValues: Set<string>): string[] {
  return options.flatMap((option) => [
    ...(selectedValues.has(option.value) ? [option.label] : []),
    ...getSelectedTreeLabels(option.children ?? [], selectedValues),
  ])
}
