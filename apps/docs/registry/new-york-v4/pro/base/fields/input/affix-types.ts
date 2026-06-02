import type { ReactNode } from 'react'

export type AffixOption = {
  label: ReactNode
  value: string
}

export type AffixConfig = {
  value?: string
  defaultValue?: string
  options: AffixOption[]
  format?: (value: string, option: AffixOption) => string
  parse?: (inputValue: string, option: AffixOption) => string
  onChange?: (value: string, option: AffixOption) => void
  ariaLabel?: string
  className?: string
}

export type AffixSlot = ReactNode | AffixConfig | AffixSlot[]
