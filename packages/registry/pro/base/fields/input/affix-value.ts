import type { AffixConfig, AffixOption } from './affix-types'
import { formatAffixValue, parseAffixValue } from './affix-utils'
import type { InputValue } from './types'

export interface SelectedAffixState {
  prefixConfig?: AffixConfig
  suffixConfig?: AffixConfig
  selectedPrefixOption?: AffixOption
  selectedSuffixOption?: AffixOption
}

export function formatSelectedAffixValue(value: InputValue | undefined, state: SelectedAffixState) {
  return formatAffixValue(value, selectedAffixEntries(state))
}

export function parseSelectedAffixValue(inputValue: string, state: SelectedAffixState) {
  return parseAffixValue(inputValue, selectedAffixEntries(state))
}

export function getNextSelectedAffixState(
  state: SelectedAffixState,
  side: 'prefix' | 'suffix',
  option: AffixOption,
): SelectedAffixState {
  return {
    ...state,
    selectedPrefixOption: side === 'prefix' ? option : state.selectedPrefixOption,
    selectedSuffixOption: side === 'suffix' ? option : state.selectedSuffixOption,
  }
}

function selectedAffixEntries(state: SelectedAffixState) {
  return [
    { config: state.prefixConfig, option: state.selectedPrefixOption },
    { config: state.suffixConfig, option: state.selectedSuffixOption },
  ]
}
