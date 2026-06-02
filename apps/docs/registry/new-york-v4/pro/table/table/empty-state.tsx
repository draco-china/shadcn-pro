import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ProTableEmptyOptions } from '../types'
import {
  tableEmptyIconClassName,
  tableEmptyStateClassName,
  tableEmptyTextClassName,
} from './classes'

export interface ProTableEmptyStateProps {
  empty?: ProTableEmptyOptions
  fallbackText?: ReactNode
}

export function ProTableEmptyState({ empty, fallbackText = 'No data' }: ProTableEmptyStateProps) {
  return (
    <div className={tableEmptyStateClassName}>
      {empty?.icon ?? <Inbox className={tableEmptyIconClassName} />}
      <span className={tableEmptyTextClassName}>{empty?.text ?? fallbackText}</span>
    </div>
  )
}
