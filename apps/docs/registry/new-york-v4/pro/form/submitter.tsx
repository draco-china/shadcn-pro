import { ProFormActions } from './layout'
import {
  defaultFooterSubmitter,
  defaultHeaderSubmitter,
  resolveSubmitterSlot,
} from './submitter-slots'
import type { ProFormRenderContext, ProFormSubmitterProps } from './submitter-types'

export type {
  ProFormRenderContext,
  ProFormSubmitterProps,
  ProFormSubmitterSlot,
} from './submitter-types'

export function getProFormSubmitterView({
  submitter,
  context,
}: {
  submitter?: false | ProFormSubmitterProps
  context: ProFormRenderContext
}) {
  if (submitter === false) {
    return {
      header: null,
      footer: null,
    }
  }

  const position = submitter?.position ?? 'footer'
  const actions = (
    <ProFormActions
      {...submitter}
      submitting={submitter?.submitting ?? context.submitting}
      reset={getResetAction(submitter, context.reset)}
    />
  )
  const hasHeaderSlot = submitter?.header !== undefined
  const hasFooterSlot = submitter?.footer !== undefined

  return {
    header: hasHeaderSlot
      ? resolveSubmitterSlot(submitter.header, actions, context)
      : !hasFooterSlot && position === 'header'
        ? defaultHeaderSubmitter(actions)
        : null,
    footer: hasFooterSlot
      ? resolveSubmitterSlot(submitter.footer, actions, context)
      : !hasHeaderSlot && position === 'footer'
        ? defaultFooterSubmitter(actions)
        : null,
  }
}

function getResetAction(
  submitter: ProFormSubmitterProps | undefined,
  reset: () => void | Promise<void>,
) {
  if (submitter?.reset === false) return false
  if (!submitter?.reset) return undefined
  return {
    ...submitter.reset,
    onClick: submitter.reset.onClick ?? reset,
  }
}
