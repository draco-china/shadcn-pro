import { Inbox } from 'lucide-react'
import type * as React from 'react'

export interface ProTableEmptyStateProps {
  icon?: React.ReactNode
  text?: React.ReactNode
}

export function ProTableEmptyState({ icon, text = 'No data' }: ProTableEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {icon ?? <Inbox className="size-8 opacity-40" />}
      <span className="text-sm">{text}</span>
    </div>
  )
}
