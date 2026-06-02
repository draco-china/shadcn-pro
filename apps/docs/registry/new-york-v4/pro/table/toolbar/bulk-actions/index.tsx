'use client'

import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef } from 'react'

import { TooltipButton } from '@/components/pro/base/button/tooltip'
import { ProSeparator } from '@/components/pro/base/separator'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  bulkActionsClearButtonClassName,
  bulkActionsLiveRegionClassName,
  bulkActionsPanelClassName,
  bulkActionsRootClassName,
  bulkActionsSeparatorClassName,
} from '../classes'
import { handleBulkActionsKeyDown } from './keyboard'
import { BulkActionsSummary } from './summary'
import { useBulkActionsAnnouncement } from './use-announcement'

export interface ProTableBulkActionsProps<TData> {
  table: Table<TData>
  children?: ReactNode
  entityName?: string
  className?: string
}

export function ProTableBulkActions<TData>({
  table,
  children,
  entityName = 'row',
  className,
}: ProTableBulkActionsProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const toolbarRef = useRef<HTMLDivElement>(null)
  const hasChildren = isRenderableNode(children)
  const announcement = useBulkActionsAnnouncement(selectedCount, entityName)

  function handleClearSelection() {
    table.resetRowSelection()
  }

  if (selectedCount === 0) return null

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className={bulkActionsLiveRegionClassName}
        role="status"
      >
        {announcement}
      </div>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedCount} selected ${entityName}${selectedCount === 1 ? '' : 's'}`}
        aria-describedby="bulk-actions-description"
        tabIndex={-1}
        onKeyDown={(event) =>
          handleBulkActionsKeyDown({ event, toolbarRef, onClear: handleClearSelection })
        }
        className={cn(bulkActionsRootClassName, className)}
      >
        <div className={bulkActionsPanelClassName}>
          <TooltipButton
            variant="outline"
            size="icon-xs"
            prefix={<X size={14} />}
            className={bulkActionsClearButtonClassName}
            title="Clear selection (Escape)"
            tooltip="Clear selection (Escape)"
            onClick={handleClearSelection}
          />

          <ProSeparator
            className={bulkActionsSeparatorClassName}
            orientation="vertical"
            aria-hidden="true"
          />

          <BulkActionsSummary selectedCount={selectedCount} entityName={entityName} />

          {hasChildren && (
            <>
              <ProSeparator
                className={bulkActionsSeparatorClassName}
                orientation="vertical"
                aria-hidden="true"
              />
              {children}
            </>
          )}
        </div>
      </div>
    </>
  )
}
