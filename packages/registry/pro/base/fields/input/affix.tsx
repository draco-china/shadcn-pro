import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { AffixSelect } from './affix-select'
import type { AffixConfig, AffixSlot } from './affix-types'
import { isAffixConfig } from './affix-utils'

export type { AffixConfig, AffixOption, AffixSlot } from './affix-types'

export interface InputAffixProps {
  affix: AffixSlot
  side: 'prefix' | 'suffix'
  selectedValue: string
  disabled?: boolean
  onChange: (value: string, affixSelect: AffixConfig, side: 'prefix' | 'suffix') => void
}

export function InputAffix({ affix, side, selectedValue, disabled, onChange }: InputAffixProps) {
  if (affix == null || typeof affix === 'boolean') return null

  if (Array.isArray(affix)) {
    return affix.map((item, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: affix slots are static composition order
      <Fragment key={index}>
        <InputAffix
          affix={item}
          side={side}
          selectedValue={selectedValue}
          disabled={disabled}
          onChange={onChange}
        />
      </Fragment>
    ))
  }

  if (isAffixConfig(affix)) {
    return (
      <AffixSelect
        affixSelect={affix}
        side={side}
        selectedValue={selectedValue}
        disabled={disabled}
        onChange={onChange}
      />
    )
  }

  return (
    <span
      className={cn(
        'shrink-0 text-sm text-muted-foreground select-none',
        side === 'prefix' ? 'mr-2' : 'ml-2',
      )}
    >
      {affix}
    </span>
  )
}
