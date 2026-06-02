import { isValidElement } from 'react'
import type { AffixConfig, AffixOption, AffixSlot } from './affix-types'
import type { InputValue } from './types'

export function isAffixConfig(affix: AffixSlot): affix is AffixConfig {
  return (
    typeof affix === 'object' &&
    affix !== null &&
    !isValidElement(affix) &&
    'options' in affix &&
    Array.isArray(affix.options)
  )
}

export function getAffixConfig(affix: AffixSlot | undefined): AffixConfig | undefined {
  if (!affix) return undefined
  if (isAffixConfig(affix)) return affix
  if (Array.isArray(affix)) return affix.map(getAffixConfig).find(isDefinedAffixConfig)
  return undefined
}

function isDefinedAffixConfig(affix: AffixConfig | undefined): affix is AffixConfig {
  return affix !== undefined
}

export function getInitialAffixValue(affix: AffixConfig | undefined) {
  return affix?.defaultValue ?? affix?.options[0]?.value ?? ''
}

export function getSelectedAffixOption(affix: AffixConfig | undefined, value: string) {
  if (!affix) return undefined
  return affix.options.find((option) => option.value === value) ?? affix.options[0]
}

export function formatAffixValue(
  value: InputValue | undefined,
  affixes: Array<{ config?: AffixConfig; option?: AffixOption }>,
) {
  return affixes.reduce(
    (nextValue, affix) =>
      affix.config?.format && affix.option
        ? affix.config.format(nextValue, affix.option)
        : nextValue,
    String(value ?? ''),
  )
}

export function parseAffixValue(
  inputValue: string,
  affixes: Array<{ config?: AffixConfig; option?: AffixOption }>,
) {
  return [...affixes]
    .reverse()
    .reduce(
      (nextValue, affix) =>
        affix.config?.parse && affix.option
          ? affix.config.parse(nextValue, affix.option)
          : nextValue,
      inputValue,
    )
}
