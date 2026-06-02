import { AlignJustify } from 'lucide-react'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { TableSize } from '../types'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'

const DENSITY_LABELS: Record<TableSize, string> = {
  default: 'Comfortable',
  middle: 'Medium',
  compact: 'Compact',
}
const DENSITY_OPTIONS: TableSize[] = ['default', 'middle', 'compact']

export function getToolbarDensityItem<TData>({
  enabled,
  disabled,
  onTableSizeChange,
  labels,
}: {
  enabled: boolean
  disabled: boolean
  onTableSizeChange?: (size: TableSize) => void
  labels?: ProTableToolbarLabels
}): ProToolbarItem<ProTableToolbarContext<TData>> | undefined {
  if (!enabled || !onTableSizeChange) return undefined

  return {
    key: 'density',
    icon: <AlignJustify size={16} />,
    tooltip: labels?.density ?? 'Density',
    variant: 'ghost',
    disabled,
    items: DENSITY_OPTIONS.map((size) => ({
      key: size,
      label: labels?.densityOptions?.[size] ?? DENSITY_LABELS[size],
      onClick: () => onTableSizeChange(size),
    })),
  }
}
