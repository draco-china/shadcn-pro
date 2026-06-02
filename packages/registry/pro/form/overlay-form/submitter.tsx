import type { ComponentType, ReactNode } from 'react'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { cn } from '@/lib/utils'
import { ProFormActions, type ProFormActionsProps } from '../layout'
import { overlayFormSubmitterClassName } from './classes'
import type { OverlayElementContentProps } from './element-types'

export type OverlayFormSubmitterProps = ProFormActionsProps

export function OverlaySubmitter({
  loading,
  submitter,
  onCancel,
}: {
  loading: boolean
  submitter?: false | OverlayFormSubmitterProps
  onCancel: () => void | Promise<void>
}) {
  if (submitter === false) return null

  const submitting = submitter?.submitting ?? loading
  const cancel =
    submitter?.cancel === false
      ? false
      : {
          text: 'Cancel',
          ...submitter?.cancel,
          onClick: onCancel,
        }
  return (
    <ProFormActions
      {...submitter}
      cancel={cancel}
      submitting={submitting}
      className={cn(overlayFormSubmitterClassName, submitter?.className)}
    />
  )
}

export function getSubmitterCancelHandler(
  submitter: false | OverlayFormSubmitterProps | undefined,
) {
  if (submitter === false || submitter === undefined) return undefined
  const cancel = submitter.cancel
  if (cancel === false || cancel === undefined) return undefined
  return cancel.onClick
}

export function OverlayFooter({
  actions,
  Footer,
  className,
  hidden,
}: {
  actions: ReactNode
  Footer: ComponentType<OverlayElementContentProps>
  className?: string
  hidden?: boolean
}) {
  if (hidden) return undefined
  if (!isRenderableNode(actions)) return undefined
  return <Footer className={className}>{actions}</Footer>
}
