'use client'

import { Check, PlusCircle } from 'lucide-react'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface FacetedFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FacetedFilterProps {
  /** Selected value(s). Single mode: string | undefined. Multi mode: string[] */
  value?: string | string[]
  onChange?: (value: string | string[] | undefined) => void
  options?: FacetedFilterOption[]
  placeholder?: string
  /** 'single' shows radio-like behavior, 'multi' allows multiple selection (default) */
  mode?: 'single' | 'multi'
  /** Facet counts from getFacetedUniqueValues() — shows count next to each option */
  facets?: Map<string, number>
  className?: string
}

export function FacetedFilter({
  value,
  onChange,
  options = [],
  placeholder = 'Filter...',
  mode = 'multi',
  facets,
  className,
}: FacetedFilterProps) {
  const selectedValues = React.useMemo(() => {
    if (!value) return new Set<string>()
    if (Array.isArray(value)) return new Set(value)
    return new Set([value])
  }, [value])

  function handleSelect(optionValue: string) {
    if (mode === 'single') {
      if (selectedValues.has(optionValue)) {
        onChange?.(undefined)
      } else {
        onChange?.(optionValue)
      }
      return
    }
    const next = new Set(selectedValues)
    if (next.has(optionValue)) {
      next.delete(optionValue)
    } else {
      next.add(optionValue)
    }
    const arr = Array.from(next)
    onChange?.(arr.length === 0 ? undefined : arr)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn('h-8 border-dashed', className)}>
          <PlusCircle className="size-4" />
          {placeholder}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((opt) => selectedValues.has(opt.value))
                    .map((opt) => (
                      <Badge
                        variant="secondary"
                        key={opt.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {opt.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className="size-4 text-background" />
                    </div>
                    {option.icon && <option.icon className="size-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                    {facets?.get(option.value) !== undefined && (
                      <span className="ms-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onChange?.(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
