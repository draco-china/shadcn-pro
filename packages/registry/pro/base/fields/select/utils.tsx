import type { MouseEvent } from 'react'
import { ProBadge } from '@/components/pro/base/badge'
import { FieldClearButton } from '@/components/pro/base/fields/shared/field'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import {
  selectClearClassName,
  selectOptionContentClassName,
  selectOptionDescriptionClassName,
  selectOverflowBadgeClassName,
  selectSelectedBadgeClassName,
  selectSelectedLabelClassName,
} from './classes'
import type { SelectOption } from './types'

export function SelectClearControl({
  onClear,
}: {
  onClear: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <FieldClearButton label="Clear selection" onClear={onClear} className={selectClearClassName} />
  )
}

export function SelectOptionContent({ option }: { option: SelectOption }) {
  return (
    <span className={selectOptionContentClassName}>
      <span>{option.label}</span>
      {isRenderableNode(option.description) && (
        <span className={selectOptionDescriptionClassName}>{option.description}</span>
      )}
    </span>
  )
}

export function getSelectedLabel(
  selectedOptions: SelectOption[],
  placeholder: string | undefined,
  maxTagCount: number,
) {
  if (!selectedOptions.length) return placeholder ?? 'Select...'

  if (selectedOptions.length === 1) {
    return <span className={selectSelectedLabelClassName}>{selectedOptions[0]?.label}</span>
  }

  const visibleOptions = selectedOptions.slice(0, maxTagCount)
  const overflow = selectedOptions.length - visibleOptions.length

  return (
    <>
      {visibleOptions.map((option) => (
        <ProBadge key={option.value} variant="secondary" className={selectSelectedBadgeClassName}>
          {option.label}
        </ProBadge>
      ))}
      {overflow > 0 && (
        <ProBadge variant="secondary" className={selectOverflowBadgeClassName}>
          +{overflow}
        </ProBadge>
      )}
    </>
  )
}
