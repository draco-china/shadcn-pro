import type { ProButtonProps } from '@/components/pro/base/button'
import type { CopyButtonCopyOptions } from '@/components/pro/base/button/copy'
import type { ProToolbarItemBase } from './item'
import type { ProToolbarAsyncState, ProToolbarContent, ProToolbarState } from './state'

export type ProToolbarCopyOptions<TContext> = Omit<
  CopyButtonCopyOptions,
  'error' | 'onError' | 'onSuccess' | 'success' | 'text'
> & {
  text: ProToolbarAsyncState<TContext, string>
  success?: ProToolbarContent<TContext>
  error?: ProToolbarContent<TContext>
  onSuccess?: (text: string, context: TContext) => void | Promise<void>
  onError?: (error: unknown, context: TContext) => void | Promise<void>
}

export type ProToolbarButtonVariant = ProButtonProps['variant']
export type ProToolbarButtonSize = ProButtonProps['size']
export type ProToolbarButtonHtmlType = 'button' | 'submit' | 'reset'

export interface ProToolbarButtonProps {
  variant?: ProToolbarButtonVariant
  className?: string
  title?: string
  'aria-label'?: string
}

export interface ProToolbarButtonItem<TContext>
  extends ProToolbarItemBase<TContext>,
    ProToolbarButtonProps {
  htmlType?: ProToolbarButtonHtmlType
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  tooltip?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  copy?: ProToolbarCopyOptions<TContext>
  size?: ProToolbarButtonSize
  onClick?: (context: TContext) => void | Promise<void>
}
