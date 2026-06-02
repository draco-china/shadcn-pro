'use client'

import { useState } from 'react'
import type { AffixSlot } from './affix'
import { getAffixConfig, getInitialAffixValue, getSelectedAffixOption } from './affix-utils'

export function useAffixSelection({ prefix, suffix }: { prefix?: AffixSlot; suffix?: AffixSlot }) {
  const prefixConfig = getAffixConfig(prefix)
  const suffixConfig = getAffixConfig(suffix)
  const [uncontrolledPrefixValue, setUncontrolledPrefixValue] = useState(() =>
    getInitialAffixValue(prefixConfig),
  )
  const [uncontrolledSuffixValue, setUncontrolledSuffixValue] = useState(() =>
    getInitialAffixValue(suffixConfig),
  )
  const selectedPrefixOption = getSelectedAffixOption(
    prefixConfig,
    prefixConfig?.value ?? uncontrolledPrefixValue,
  )
  const selectedSuffixOption = getSelectedAffixOption(
    suffixConfig,
    suffixConfig?.value ?? uncontrolledSuffixValue,
  )

  return {
    prefixConfig,
    suffixConfig,
    selectedPrefixOption,
    selectedSuffixOption,
    setUncontrolledPrefixValue,
    setUncontrolledSuffixValue,
  }
}
