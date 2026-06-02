import type { ProToolbarButtonProps, ProToolbarButtonSize } from './button'
import type { ProToolbarItemBase } from './item'
import type { ProToolbarContent, ProToolbarState } from './state'

export interface ProToolbarMenuOption<TContext> {
  key: string
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  shortcut?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  hidden?: ProToolbarState<TContext, boolean>
  danger?: ProToolbarState<TContext, boolean>
  separator?: 'left' | 'right' | 'both'
  onClick?: (context: TContext) => void | Promise<void>
}

export interface ProToolbarMenuItem<TContext>
  extends ProToolbarItemBase<TContext>,
    ProToolbarButtonProps {
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  tooltip?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  size?: ProToolbarButtonSize
  items:
    | ProToolbarMenuOption<TContext>[]
    | ((context: TContext) => ProToolbarMenuOption<TContext>[])
}
