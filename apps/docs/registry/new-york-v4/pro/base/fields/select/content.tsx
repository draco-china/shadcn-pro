import { FieldSelectContent, FieldSelectItem } from '../shared/select'
import type { SelectOption } from './types'
import { SelectOptionContent } from './utils'

interface SingleSelectContentProps {
  options?: SelectOption[]
  contentClassName?: string
}

export function SingleSelectContent({ options, contentClassName }: SingleSelectContentProps) {
  return (
    <FieldSelectContent className={contentClassName}>
      {options?.map((option) => (
        <FieldSelectItem key={option.value} value={option.value} disabled={option.disabled}>
          <SelectOptionContent option={option} />
        </FieldSelectItem>
      ))}
    </FieldSelectContent>
  )
}
