'use client'

import type { ChangeEvent, ChangeEventHandler, RefObject } from 'react'
import type { AffixConfig, AffixSlot } from './affix'
import {
  formatSelectedAffixValue,
  getNextSelectedAffixState,
  parseSelectedAffixValue,
} from './affix-value'
import type { InputValue } from './types'
import { useAffixSelection } from './use-affix-selection'
import { useInputValue } from './use-input-value'

export function useInputAffix({
  prefix,
  suffix,
  value,
  defaultValue,
  onChange,
  inputRef,
}: {
  prefix?: AffixSlot
  suffix?: AffixSlot
  value?: InputValue
  defaultValue?: InputValue
  onChange?: ChangeEventHandler<HTMLInputElement>
  inputRef: RefObject<HTMLInputElement | null>
}) {
  const { currentValue, emitValue } = useInputValue({
    value,
    defaultValue,
    onChange,
    inputRef,
  })
  const affixSelection = useAffixSelection({ prefix, suffix })
  const displayValue = formatSelectedAffixValue(currentValue, affixSelection)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    emitValue(parseSelectedAffixValue(event.target.value, affixSelection), event)
  }

  function handleAffixSelectChange(
    nextAffixValue: string,
    affixSelect: AffixConfig,
    side: 'prefix' | 'suffix',
  ) {
    const option = affixSelect.options.find((item) => item.value === nextAffixValue)
    if (!option) return

    const nextAffixSelection = getNextSelectedAffixState(affixSelection, side, option)
    const visibleValue = inputRef.current?.value ?? displayValue

    if (side === 'prefix' && affixSelect.value === undefined)
      affixSelection.setUncontrolledPrefixValue(option.value)
    if (side === 'suffix' && affixSelect.value === undefined)
      affixSelection.setUncontrolledSuffixValue(option.value)

    affixSelect.onChange?.(option.value, option)
    emitValue(parseSelectedAffixValue(visibleValue, nextAffixSelection))
  }

  return {
    currentValue,
    displayValue,
    selectedPrefixValue: affixSelection.selectedPrefixOption?.value ?? '',
    selectedSuffixValue: affixSelection.selectedSuffixOption?.value ?? '',
    emitValue,
    handleInputChange,
    handleAffixSelectChange,
  }
}
