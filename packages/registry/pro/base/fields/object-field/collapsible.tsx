'use client'

import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { useState } from 'react'
import { ObjectFieldBody } from './body'
import type { ObjectFieldProps } from './types'
import { getObjectFieldRootClassName, isSeparatedObjectField } from './utils'

export function CollapsibleObjectField({
  title,
  description,
  action,
  children,
  defaultOpen = true,
  variant = 'separated',
  className,
  contentClassName,
}: Omit<ObjectFieldProps, 'collapsible'>) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <CollapsiblePrimitive.Root
      data-slot="object-field-collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <div className={getObjectFieldRootClassName({ variant, className })}>
        <ObjectFieldBody
          title={title}
          description={description}
          action={action}
          collapsible
          open={open}
          separated={isSeparatedObjectField(variant)}
          contentClassName={contentClassName}
        >
          {children}
        </ObjectFieldBody>
      </div>
    </CollapsiblePrimitive.Root>
  )
}
