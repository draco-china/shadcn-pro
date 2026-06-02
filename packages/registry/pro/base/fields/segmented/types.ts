import type { ReactNode } from 'react'

export interface SegmentedOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export type SegmentedVariant = 'default' | 'outline'
export type SegmentedSize = 'default' | 'sm' | 'lg'

export interface SegmentedProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options?: SegmentedOption[]
  variant?: SegmentedVariant
  size?: SegmentedSize
  disabled?: boolean
  className?: string
}
