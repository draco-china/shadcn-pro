import { ProToolbar } from '@/components/pro/base/toolbar'
import { ProTableBulkActions } from '../toolbar/bulk-actions'
import type { ProTableBulkToolbarOptions } from '../types'
import type { ReturnProTable } from './view-types'

export function ProTableViewBulkActions<TData, TValue>({
  proTable,
  bulkToolbar,
}: {
  proTable: ReturnProTable<TData, TValue>
  bulkToolbar?: false | ProTableBulkToolbarOptions<TData>
}) {
  const bulkToolbarOptions = typeof bulkToolbar === 'object' ? bulkToolbar : undefined
  const actions = bulkToolbarOptions?.actions ?? []

  if (!actions.length) return null

  return (
    <ProTableBulkActions table={proTable.table} entityName={bulkToolbarOptions?.entityName}>
      <ProToolbar context={proTable.renderContext} right={{ options: actions }} />
    </ProTableBulkActions>
  )
}
