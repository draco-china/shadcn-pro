'use client'

import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ProFormLayoutProps {
  children?: ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: string
  className?: string
}

const colsClass: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function ProFormGrid({
  children,
  columns = 1,
  gap = 'gap-4',
  className,
}: ProFormLayoutProps) {
  return (
    <div className={cn('grid', colsClass[columns] ?? 'grid-cols-1', gap, className)}>
      {children}
    </div>
  )
}

export interface ProFormActionsProps {
  submitText?: string
  resetText?: string
  showReset?: boolean
  onReset?: () => void | Promise<void>
  loading?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
  children?: ReactNode
}

const alignClass: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export function ProFormActions({
  submitText = 'Submit',
  resetText = 'Reset',
  showReset = false,
  onReset,
  loading = false,
  align = 'left',
  className,
  children,
}: ProFormActionsProps) {
  return (
    <div className={cn('flex items-center gap-2 pt-2', alignClass[align], className)}>
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : submitText}
      </Button>
      {showReset && (
        <Button type="button" variant="outline" onClick={onReset}>
          {resetText}
        </Button>
      )}
      {children}
    </div>
  )
}
