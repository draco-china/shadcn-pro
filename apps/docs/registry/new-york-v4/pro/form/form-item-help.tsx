import type { ReactNode } from 'react'
import { isRenderableNode } from '@/components/pro/base/utils/react-node'
import { formItemErrorClassName, formItemExtraClassName } from './classes'

export function FormItemError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null

  return (
    <p className={formItemErrorClassName} role="alert">
      {errors.join(', ')}
    </p>
  )
}

export function FormItemExtra({ extra }: { extra?: ReactNode }) {
  if (!isRenderableNode(extra)) return null

  return <div className={formItemExtraClassName}>{extra}</div>
}
