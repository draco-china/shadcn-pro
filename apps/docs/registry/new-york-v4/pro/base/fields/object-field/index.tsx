'use client'

import { ObjectFieldBody } from './body'
import { CollapsibleObjectField } from './collapsible'
import type { ObjectFieldProps } from './types'
import { getObjectFieldRootClassName, isSeparatedObjectField } from './utils'

export type { ObjectFieldProps } from './types'

export function ObjectField({
  title,
  description,
  action,
  children,
  collapsible = false,
  defaultOpen = true,
  variant = 'separated',
  className,
  contentClassName,
}: ObjectFieldProps) {
  if (collapsible) {
    return (
      <CollapsibleObjectField
        title={title}
        description={description}
        action={action}
        defaultOpen={defaultOpen}
        variant={variant}
        className={className}
        contentClassName={contentClassName}
      >
        {children}
      </CollapsibleObjectField>
    )
  }

  return (
    <div className={getObjectFieldRootClassName({ variant, className })}>
      <ObjectFieldBody
        title={title}
        description={description}
        action={action}
        separated={isSeparatedObjectField(variant)}
        contentClassName={contentClassName}
      >
        {children}
      </ObjectFieldBody>
    </div>
  )
}

ObjectField.displayName = 'ObjectField'
