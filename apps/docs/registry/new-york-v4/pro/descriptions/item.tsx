import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  descriptionsBorderedItemClassName,
  descriptionsBorderedLabelClassName,
  descriptionsBorderedValueClassName,
  descriptionsEmptyValueClassName,
  descriptionsHorizontalItemClassName,
  descriptionsHorizontalLabelClassName,
  descriptionsItemClassName,
  descriptionsItemLabelClassName,
  descriptionsItemValueClassName,
  descriptionsPlainLabelClassName,
  descriptionsPlainValueClassName,
  descriptionsVerticalItemClassName,
  descriptionsVerticalLabelClassName,
  getDescriptionSpan,
  spanClassName,
} from './styles'
import type { DescriptionsItem, ProDescriptionsProps } from './types'

interface ProDescriptionsItemProps {
  item: DescriptionsItem
  columns: NonNullable<ProDescriptionsProps['columns']>
  bordered: boolean
  layout: NonNullable<ProDescriptionsProps['layout']>
  labelClassName?: string
  valueClassName?: string
}

export function ProDescriptionsItem({
  item,
  columns,
  bordered,
  layout,
  labelClassName,
  valueClassName,
}: ProDescriptionsItemProps) {
  const span = getDescriptionSpan(item.span, columns)

  return (
    <div
      className={cn(
        descriptionsItemClassName,
        spanClassName[span],
        layout === 'horizontal'
          ? descriptionsHorizontalItemClassName
          : descriptionsVerticalItemClassName,
        bordered && descriptionsBorderedItemClassName,
        item.className,
      )}
    >
      <div
        className={cn(
          descriptionsItemLabelClassName,
          bordered ? descriptionsBorderedLabelClassName : descriptionsPlainLabelClassName,
          layout === 'horizontal'
            ? descriptionsHorizontalLabelClassName
            : descriptionsVerticalLabelClassName,
          labelClassName,
        )}
      >
        {item.label}
      </div>
      <div
        className={cn(
          descriptionsItemValueClassName,
          bordered ? descriptionsBorderedValueClassName : descriptionsPlainValueClassName,
          valueClassName,
        )}
      >
        {isRenderableNode(item.value) ? (
          item.value
        ) : (
          <span className={descriptionsEmptyValueClassName}>—</span>
        )}
      </div>
    </div>
  )
}
