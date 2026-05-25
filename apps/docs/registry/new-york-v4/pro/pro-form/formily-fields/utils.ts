import type { CascaderOption } from '../../pro-fields/cascader'
import type { TreeSelectOption } from '../../pro-fields/tree-select'

export function fieldValue<T>(field: unknown): T | undefined {
  return (field as { value?: T }).value
}

export function fieldPlaceholder(field: unknown): string | undefined {
  return (field as { placeholder?: string }).placeholder
}

export function fieldDataSource<T>(field: unknown): T[] | undefined {
  return (field as { dataSource?: T[] }).dataSource
}

export function toDate(value: Date | string | undefined) {
  if (value instanceof Date) return value
  if (typeof value === 'string' && value) return new Date(value)
  return undefined
}

export function getCascaderLabel(options: CascaderOption[], path: string[]): string {
  let current = options
  const labels: string[] = []
  for (const value of path) {
    const found = current.find((option) => option.value === value)
    if (!found) break
    labels.push(found.label)
    current = found.children ?? []
  }
  return labels.join(' / ')
}

export function getTreeSelectLabels(options: TreeSelectOption[], values: string[]): string {
  const labels: string[] = []
  function traverse(items: TreeSelectOption[]) {
    for (const item of items) {
      if (values.includes(item.value)) labels.push(item.label)
      if (item.children) traverse(item.children)
    }
  }
  traverse(options)
  return labels.join(', ')
}

export function formatMoney(value: number, precision: number, currency: string) {
  return `${currency} ${value.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`
}
