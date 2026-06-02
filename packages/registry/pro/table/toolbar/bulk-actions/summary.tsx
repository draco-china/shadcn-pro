import {
  bulkActionsCountClassName,
  bulkActionsEntityNameClassName,
  bulkActionsSummaryClassName,
} from '../classes'

export function BulkActionsSummary({
  selectedCount,
  entityName,
}: {
  selectedCount: number
  entityName: string
}) {
  return (
    <div className={bulkActionsSummaryClassName} id="bulk-actions-description">
      <span className={bulkActionsCountClassName}>{selectedCount}</span>
      <span className={bulkActionsEntityNameClassName}>
        {entityName}
        {selectedCount === 1 ? '' : 's'}
      </span>
      selected
    </div>
  )
}
