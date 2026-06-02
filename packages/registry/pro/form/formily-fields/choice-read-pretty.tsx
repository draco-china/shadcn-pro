import type { CheckboxOption } from '../../base/fields/checkbox'
import type { RadioOption } from '../../base/fields/radio'
import type { SegmentedOption } from '../../base/fields/segmented'
import type { SelectOption } from '../../base/fields/select'
import { getReadPrettyOptionLabel, ReadPrettyOptionLabels, ReadPrettyText } from './read-pretty'

export function ReadPrettyCheckbox({
  value,
  options,
}: {
  value?: boolean | string[]
  options?: CheckboxOption[]
}) {
  if (Array.isArray(value)) {
    return <ReadPrettyOptionLabels options={options} value={value} />
  }

  return <ReadPrettyText value={value ? 'Yes' : 'No'} />
}

export function ReadPrettySwitch({ value }: { value?: boolean }) {
  return <ReadPrettyText value={value ? 'On' : 'Off'} />
}

export function ReadPrettyRadio({ value, options }: { value?: string; options?: RadioOption[] }) {
  return <ReadPrettyText value={getReadPrettyOptionLabel(options, value)} />
}

export function ReadPrettySelect({
  value,
  options,
}: {
  value?: string | string[]
  options?: SelectOption[]
}) {
  if (Array.isArray(value)) {
    return <ReadPrettyOptionLabels options={options} value={value} />
  }

  return <ReadPrettyText value={getReadPrettyOptionLabel(options, value)} />
}

export function ReadPrettySegmented({
  value,
  options,
}: {
  value?: string
  options?: SegmentedOption[]
}) {
  return <ReadPrettyText value={getReadPrettyOptionLabel(options, value)} />
}
