'use client'

import { Fragment, type ReactNode } from 'react'
import { readPrettyTextClassName } from './classes'

export type ReadPrettyOption = {
  label: ReactNode
  value: string
}

export function ReadPrettyText({
  value,
  className = readPrettyTextClassName,
  fallback = '-',
}: {
  value?: ReactNode
  className?: string
  fallback?: ReactNode
}) {
  return <span className={className}>{value ?? fallback}</span>
}

export function ReadPrettyOptionLabels({
  options,
  value,
}: {
  options?: ReadPrettyOption[]
  value?: string[]
}) {
  const selectedOptions = value?.length
    ? options?.filter((item) => value.includes(item.value))
    : undefined

  return (
    <span className={readPrettyTextClassName}>
      {selectedOptions?.length
        ? selectedOptions.map((option, index) => (
            <Fragment key={option.value}>
              {index > 0 ? ', ' : null}
              {option.label}
            </Fragment>
          ))
        : '-'}
    </span>
  )
}

export function getReadPrettyOptionLabel(
  options: ReadPrettyOption[] | undefined,
  value: string | undefined,
) {
  return options?.find((item) => item.value === value)?.label ?? value
}
