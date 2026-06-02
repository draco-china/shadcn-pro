import { closestCenter, DndContext } from '@dnd-kit/core'
import { ProTableContent, type ProTableContentProps } from './content'

export function ProTableContentFrame<TData>({
  proTable,
  tableOptions,
  paginationOptions,
  fullLayout,
  loading,
  loadingRows,
  empty,
  requestError,
}: ProTableContentProps<TData>) {
  if (proTable.dragSortEnabled && !loading) {
    return (
      <DndContext
        sensors={proTable.sensors}
        collisionDetection={closestCenter}
        onDragEnd={proTable.handleDragEnd}
      >
        <ProTableContent
          proTable={proTable}
          tableOptions={tableOptions}
          paginationOptions={paginationOptions}
          fullLayout={fullLayout}
          loading={loading}
          loadingRows={loadingRows}
          empty={empty}
          requestError={requestError}
        />
      </DndContext>
    )
  }

  return (
    <ProTableContent
      proTable={proTable}
      tableOptions={tableOptions}
      paginationOptions={paginationOptions}
      fullLayout={fullLayout}
      loading={loading}
      loadingRows={loadingRows}
      empty={empty}
      requestError={requestError}
    />
  )
}
