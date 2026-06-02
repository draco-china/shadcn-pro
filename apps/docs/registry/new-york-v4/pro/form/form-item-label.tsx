import { InfoIcon } from 'lucide-react'
import { Tooltip as TooltipPrimitive } from 'radix-ui'
import type { ReactNode } from 'react'
import {
  tooltipArrowClassName,
  tooltipContentClassName,
} from '@/components/pro/base/button/classes'
import { ProLabel } from '@/components/pro/base/label'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import {
  formItemLabelClassName,
  formItemLabelDisabledClassName,
  formItemLabelRowClassName,
  formItemRequiredMarkClassName,
  formItemTooltipIconClassName,
  formItemTooltipTextClassName,
} from './classes'

export function FormItemLabel({
  htmlFor,
  label,
  required,
  disabled,
  tooltip,
}: {
  htmlFor?: string
  label?: ReactNode
  required?: boolean
  disabled?: boolean
  tooltip?: ReactNode
}) {
  if (!isRenderableNode(label)) return null

  return (
    <div className={formItemLabelRowClassName}>
      <ProLabel
        htmlFor={htmlFor}
        className={cn(formItemLabelClassName, disabled && formItemLabelDisabledClassName)}
      >
        {label}
      </ProLabel>
      {isRenderableNode(tooltip) && (
        <TooltipPrimitive.Provider>
          <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger asChild>
              <InfoIcon className={formItemTooltipIconClassName} />
            </TooltipPrimitive.Trigger>
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Content side="right" className={tooltipContentClassName}>
                <p className={formItemTooltipTextClassName}>{tooltip}</p>
                <TooltipPrimitive.Arrow className={tooltipArrowClassName} />
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
      )}
      {required && (
        <span className={formItemRequiredMarkClassName} aria-hidden="true">
          *
        </span>
      )}
    </div>
  )
}
