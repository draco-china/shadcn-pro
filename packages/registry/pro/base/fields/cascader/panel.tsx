'use client'

import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProButton } from '@/components/pro/base/button'
import { cn } from '@/lib/utils'
import {
  cascaderChevronClassName,
  cascaderColumnClassName,
  cascaderOptionActiveClassName,
  cascaderOptionClassName,
  cascaderPanelClassName,
} from './classes'
import type { CascaderOption } from './types'

const EMPTY_OPTIONS: CascaderOption[] = []

export function CascaderPanel({
  options,
  path,
  onSelect,
}: {
  options?: CascaderOption[]
  path: string[]
  onSelect: (path: string[]) => void
}) {
  const rootOptions = options ?? EMPTY_OPTIONS
  const [columns, setColumns] = useState<CascaderOption[][]>([rootOptions])
  const [selected, setSelected] = useState<string[]>(path)

  useEffect(() => {
    setColumns([rootOptions])
    setSelected(path)
  }, [rootOptions, path])

  function handleClick(option: CascaderOption, columnIndex: number) {
    if (option.disabled) return

    const nextSelected = [...selected.slice(0, columnIndex), option.value]
    setSelected(nextSelected)

    if (option.children?.length) {
      setColumns([...columns.slice(0, columnIndex + 1), option.children])
      return
    }

    setColumns(columns.slice(0, columnIndex + 1))
    onSelect(nextSelected)
  }

  return (
    <div className={cascaderPanelClassName}>
      {columns.map((column, columnIndex) => (
        <ul
          // biome-ignore lint/suspicious/noArrayIndexKey: column index represents the cascader depth level.
          key={columnIndex}
          className={cascaderColumnClassName}
        >
          {column.map((option) => (
            <li key={option.value}>
              <ProButton
                type="button"
                variant="ghost"
                size="sm"
                disabled={option.disabled}
                onClick={() => handleClick(option, columnIndex)}
                className={cn(
                  cascaderOptionClassName,
                  selected[columnIndex] === option.value && cascaderOptionActiveClassName,
                )}
              >
                {option.label}
                {option.children?.length ? (
                  <ChevronRight className={cascaderChevronClassName} />
                ) : null}
              </ProButton>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
