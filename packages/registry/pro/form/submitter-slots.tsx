import type { ReactNode } from 'react'
import { formFooterSubmitterClassName, formHeaderSubmitterClassName } from './classes'
import type { ProFormRenderContext, ProFormSubmitterSlot } from './submitter-types'

export function resolveSubmitterSlot(
  slot: ProFormSubmitterSlot,
  actions: ReactNode,
  context: ProFormRenderContext,
) {
  return typeof slot === 'function' ? slot(actions, context) : slot
}

export function defaultHeaderSubmitter(actions: ReactNode) {
  return <div className={formHeaderSubmitterClassName}>{actions}</div>
}

export function defaultFooterSubmitter(actions: ReactNode) {
  return <div className={formFooterSubmitterClassName}>{actions}</div>
}
