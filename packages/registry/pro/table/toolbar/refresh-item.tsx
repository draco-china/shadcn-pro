import { RefreshButton } from '@/components/pro/base/button/refresh'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { ProTableToolbarContext, ProTableToolbarLabels } from './types'

export function getToolbarRefreshItem<TData>({
  refresh,
  disabled,
  labels,
}: {
  refresh?: () => void
  disabled: boolean
  labels?: ProTableToolbarLabels
}): ProToolbarItem<ProTableToolbarContext<TData>> | undefined {
  if (!refresh) return undefined

  return {
    key: 'refresh',
    render: () => (
      <RefreshButton
        tooltip={labels?.refresh ?? 'Refresh'}
        variant="ghost"
        size="icon-sm"
        disabled={disabled}
        onClick={refresh}
      />
    ),
  }
}
