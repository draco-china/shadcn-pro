import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import { ProDescriptionsItem } from './item'
import {
  columnsClassName,
  descriptionsBorderedGridClassName,
  descriptionsGridClassName,
  descriptionsRootClassName,
  descriptionsTitleClassName,
} from './styles'
import type { ProDescriptionsProps } from './types'
import { getDescriptionItemKey } from './utils'

export type { DescriptionsItem, ProDescriptionsProps } from './types'

export function ProDescriptions({
  title,
  items,
  columns = 2,
  bordered = false,
  layout = 'horizontal',
  className,
  labelClassName,
  valueClassName,
}: ProDescriptionsProps) {
  return (
    <div className={cn(descriptionsRootClassName, className)}>
      {isRenderableNode(title) && <div className={descriptionsTitleClassName}>{title}</div>}
      <div
        className={cn(
          descriptionsGridClassName,
          columnsClassName[columns],
          bordered && descriptionsBorderedGridClassName,
        )}
      >
        {items.map((item, index) => (
          <ProDescriptionsItem
            key={getDescriptionItemKey(item, index)}
            item={item}
            columns={columns}
            bordered={bordered}
            layout={layout}
            labelClassName={labelClassName}
            valueClassName={valueClassName}
          />
        ))}
      </div>
    </div>
  )
}

ProDescriptions.displayName = 'ProDescriptions'
