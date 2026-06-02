import { PlusCircle } from 'lucide-react'
import { ProBadge } from '@/components/pro/base/badge'
import { ProButton } from '@/components/pro/base/button'
import { ProSeparator } from '@/components/pro/base/separator'
import { cn } from '@/lib/utils'
import {
  facetedFilterBadgeClassName,
  facetedFilterDesktopBadgeListClassName,
  facetedFilterSeparatorClassName,
  facetedFilterTriggerClassName,
  facetedFilterTriggerIconClassName,
} from './classes'
import type { FacetedFilterOption } from './types'

export function FacetedFilterTrigger({
  options,
  placeholder,
  selectedValues,
  className,
}: {
  options?: FacetedFilterOption[]
  placeholder: string
  selectedValues: Set<string>
  className?: string
}) {
  return (
    <ProButton
      type="button"
      variant="outline"
      size="sm"
      className={cn(facetedFilterTriggerClassName, className)}
    >
      <PlusCircle className={facetedFilterTriggerIconClassName} />
      {placeholder}
      {selectedValues.size > 0 && (
        <>
          <ProSeparator orientation="vertical" className={facetedFilterSeparatorClassName} />
          <ProBadge variant="secondary" className={cn(facetedFilterBadgeClassName, 'lg:hidden')}>
            {selectedValues.size}
          </ProBadge>
          <div className={facetedFilterDesktopBadgeListClassName}>
            {selectedValues.size > 2 ? (
              <ProBadge variant="secondary" className={facetedFilterBadgeClassName}>
                {selectedValues.size} selected
              </ProBadge>
            ) : (
              options
                ?.filter((option) => selectedValues.has(option.value))
                .map((option) => (
                  <ProBadge
                    variant="secondary"
                    key={option.value}
                    className={facetedFilterBadgeClassName}
                  >
                    {option.label}
                  </ProBadge>
                ))
            )}
          </div>
        </>
      )}
    </ProButton>
  )
}
