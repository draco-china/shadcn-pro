import { ProTableToolbar } from '../toolbar'
import type { ProTableToolbarOptions } from '../types'
import type { ReturnProTable } from './view-types'

export function ProTableViewToolbar<TData, TValue>({
  proTable,
  toolbar,
  disabled,
}: {
  proTable: ReturnProTable<TData, TValue>
  toolbar?: false | ProTableToolbarOptions<TData>
  disabled: boolean
}) {
  if (toolbar === false) return null

  const toolbarOptions = typeof toolbar === 'object' ? toolbar : undefined
  const builtInOptions = toolbarOptions?.options === false ? undefined : toolbarOptions?.options

  return (
    <ProTableToolbar
      table={proTable.table}
      disabled={disabled}
      search={toolbarOptions?.search}
      filters={toolbarOptions?.filters}
      actions={toolbarOptions?.actions}
      columns={builtInOptions?.columns ?? true}
      density={builtInOptions?.density ?? true}
      refresh={builtInOptions?.refresh || undefined}
      tableSize={proTable.tableSize}
      onTableSizeChange={proTable.setTableSize}
      defaultColumnOrder={proTable.defaultColumnOrder}
      defaultColumnPinning={proTable.defaultColumnPinning}
      labels={toolbarOptions?.labels}
      context={proTable.renderContext}
    />
  )
}
