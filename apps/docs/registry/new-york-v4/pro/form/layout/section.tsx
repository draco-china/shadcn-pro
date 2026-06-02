import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  proFormSectionActionClassName,
  proFormSectionClassName,
  proFormSectionDescriptionClassName,
  proFormSectionHeaderClassName,
  proFormSectionTitleClassName,
  proFormSectionTitleGroupClassName,
} from './classes'
import type { ProFormBodyProps, ProFormSectionProps } from './types'
import { getProFormGridClassName, getProFormRootSectionProps } from './utils'

export function ProFormSection({
  title,
  description,
  action,
  children,
  columns,
  gap = 'gap-4',
  className,
  contentClassName,
}: ProFormSectionProps) {
  const hasTitle = isRenderableNode(title)
  const hasDescription = isRenderableNode(description)
  const hasAction = isRenderableNode(action)
  const hasHeader = hasTitle || hasDescription || hasAction
  const layoutClassName = getProFormGridClassName(columns, gap)

  return (
    <section data-slot="pro-form-section" className={cn(proFormSectionClassName, className)}>
      {hasHeader && (
        <div className={proFormSectionHeaderClassName}>
          <div className={proFormSectionTitleGroupClassName}>
            {hasTitle && <h3 className={proFormSectionTitleClassName}>{title}</h3>}
            {hasDescription && <p className={proFormSectionDescriptionClassName}>{description}</p>}
          </div>
          {hasAction && <div className={proFormSectionActionClassName}>{action}</div>}
        </div>
      )}
      <div className={cn(layoutClassName, contentClassName)}>{children}</div>
    </section>
  )
}

export function ProFormBody({
  schema,
  children,
  columns,
  gap = 'gap-4',
  className,
}: ProFormBodyProps) {
  const rootSectionProps = getProFormRootSectionProps(schema)

  if (rootSectionProps) {
    return (
      <ProFormSection
        {...rootSectionProps}
        columns={rootSectionProps.columns ?? columns}
        gap={rootSectionProps.gap ?? gap}
        className={cn(className, rootSectionProps.className)}
      >
        {children}
      </ProFormSection>
    )
  }

  return <div className={cn(getProFormGridClassName(columns, gap), className)}>{children}</div>
}
