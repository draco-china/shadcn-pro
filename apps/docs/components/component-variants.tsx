import * as React from 'react'
import { ComponentPreviewTabs } from '@/components/component-preview-tabs'
import { ComponentSource } from '@/components/component-source'
import { VariantsTabSwitcher } from '@/components/variants-tab-switcher'
import { getRegistryComponent } from '@/lib/registry'

interface Variant {
  name: string
  title: string
  previewClassName?: string
}

export function ComponentVariants({
  variants,
  styleName = 'new-york-v4',
  previewClassName,
  className,
}: {
  variants: Variant[]
  styleName?: string
  previewClassName?: string
  className?: string
}) {
  // Build preview nodes for each variant on the server side
  const previews = variants.map((v) => {
    const Component = getRegistryComponent(v.name, styleName)
    if (!Component) return null
    return (
      <ComponentPreviewTabs
        key={v.name}
        align="start"
        previewClassName={`min-h-[400px] p-6 ${v.previewClassName ?? ''} ${previewClassName ?? ''}`}
        component={React.createElement(Component)}
        source={<ComponentSource name={v.name} collapsible={false} styleName={styleName} />}
        sourcePreview={
          <ComponentSource name={v.name} collapsible={false} styleName={styleName} maxLines={3} />
        }
        styleName={styleName}
      />
    )
  })

  return <VariantsTabSwitcher variants={variants} previews={previews} className={className} />
}
