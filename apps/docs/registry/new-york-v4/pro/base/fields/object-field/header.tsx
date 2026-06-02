import { ChevronDown } from 'lucide-react'
import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import { FieldIconButton } from '../shared/field'
import {
  objectFieldDescriptionClassName,
  objectFieldDescriptionWrapClassName,
  objectFieldHeaderActionsClassName,
  objectFieldHeaderButtonClassName,
  objectFieldHeaderClassName,
  objectFieldHeaderIconClassName,
  objectFieldHeaderIconOpenClassName,
  objectFieldHeaderRowClassName,
  objectFieldHeaderTitleWrapClassName,
  objectFieldTitleClassName,
} from './classes'
import type { ObjectFieldHeaderProps } from './types'

export function ObjectFieldHeader({
  title,
  description,
  action,
  collapsible,
  open,
}: ObjectFieldHeaderProps) {
  const hasTitle = isRenderableNode(title)
  const hasDescription = isRenderableNode(description)

  return (
    <div className={objectFieldHeaderClassName}>
      <div className={objectFieldHeaderRowClassName}>
        <div className={objectFieldHeaderTitleWrapClassName}>
          {hasTitle && <p className={objectFieldTitleClassName}>{title}</p>}
        </div>
        <div className={objectFieldHeaderActionsClassName}>
          {action}
          {collapsible && (
            <CollapsiblePrimitive.Trigger asChild>
              <FieldIconButton
                size="icon-xs"
                className={objectFieldHeaderButtonClassName}
                aria-label={open ? 'Collapse' : 'Expand'}
              >
                <ChevronDown
                  className={cn(
                    objectFieldHeaderIconClassName,
                    open && objectFieldHeaderIconOpenClassName,
                  )}
                />
              </FieldIconButton>
            </CollapsiblePrimitive.Trigger>
          )}
        </div>
      </div>
      {hasDescription && (
        <div className={objectFieldDescriptionWrapClassName}>
          <p className={objectFieldDescriptionClassName}>{description}</p>
        </div>
      )}
    </div>
  )
}
