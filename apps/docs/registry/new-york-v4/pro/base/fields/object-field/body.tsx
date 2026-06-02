import { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import { ProSeparator } from '@/components/pro/base/separator'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { objectFieldSeparatorClassName } from './classes'
import { ObjectFieldContent } from './content'
import { ObjectFieldHeader } from './header'
import type { ObjectFieldBodyProps } from './types'

export function ObjectFieldBody({
  title,
  description,
  action,
  collapsible,
  open,
  separated,
  contentClassName,
  children,
}: ObjectFieldBodyProps) {
  const hasHeader =
    isRenderableNode(title) || isRenderableNode(description) || isRenderableNode(action)

  return (
    <>
      {hasHeader && (
        <ObjectFieldHeader
          title={title}
          description={description}
          action={action}
          collapsible={collapsible}
          open={open}
        />
      )}
      {separated && hasHeader && <ProSeparator className={objectFieldSeparatorClassName} />}
      {collapsible ? (
        <CollapsiblePrimitive.Content data-slot="object-field-collapsible-content">
          <ObjectFieldContent padded={!separated && hasHeader} className={contentClassName}>
            {children}
          </ObjectFieldContent>
        </CollapsiblePrimitive.Content>
      ) : (
        <ObjectFieldContent className={contentClassName}>{children}</ObjectFieldContent>
      )}
    </>
  )
}
