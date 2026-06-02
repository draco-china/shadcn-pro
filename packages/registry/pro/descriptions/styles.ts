import type { DescriptionSpan, ProDescriptionsColumns } from './types'

export const descriptionsRootClassName = 'w-full'

export const descriptionsTitleClassName = 'mb-4 text-base font-semibold text-foreground'

export const descriptionsGridClassName = 'grid gap-0'

export const descriptionsBorderedGridClassName = 'overflow-hidden rounded-md border'

export const descriptionsItemClassName = 'flex'

export const descriptionsHorizontalItemClassName = 'flex-col sm:flex-row'

export const descriptionsVerticalItemClassName = 'flex-col'

export const descriptionsBorderedItemClassName = 'border-r border-b'

export const descriptionsItemLabelClassName = 'shrink-0 text-sm font-medium text-muted-foreground'

export const descriptionsBorderedLabelClassName = 'bg-muted/40 px-4 py-3'

export const descriptionsPlainLabelClassName = 'py-2 pr-4'

export const descriptionsHorizontalLabelClassName = 'sm:w-32'

export const descriptionsVerticalLabelClassName = 'mb-1'

export const descriptionsItemValueClassName = 'flex-1 text-sm text-foreground'

export const descriptionsBorderedValueClassName = 'px-4 py-3'

export const descriptionsPlainValueClassName = 'py-2'

export const descriptionsEmptyValueClassName = 'text-muted-foreground'

export const columnsClassName: Record<ProDescriptionsColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export const spanClassName: Record<DescriptionSpan, string> = {
  1: 'col-span-1',
  2: 'col-span-1 sm:col-span-2',
  3: 'col-span-1 sm:col-span-2 lg:col-span-3',
  4: 'col-span-1 sm:col-span-2 lg:col-span-4',
}

export function getDescriptionSpan(span: number | undefined, columns: ProDescriptionsColumns) {
  const nextSpan = span ?? 1
  if (!Number.isFinite(nextSpan)) return 1

  return Math.min(Math.max(Math.trunc(nextSpan), 1), columns) as DescriptionSpan
}
