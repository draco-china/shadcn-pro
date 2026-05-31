import type * as React from 'react'

import type { ProButton, ProButtonCopyOptions } from '@/components/pro/pro-base'

export type ProToolbarState<TContext, TValue> = TValue | ((context: TContext) => TValue)
export type ProToolbarAsyncState<TContext, TValue> =
  | TValue
  | ((context: TContext) => TValue | Promise<TValue>)
export type ProToolbarContent<TContext> = React.ReactNode | ((context: TContext) => React.ReactNode)
export type ProToolbarCopyOptions<TContext> = Omit<
  ProButtonCopyOptions,
  'error' | 'onError' | 'onSuccess' | 'success' | 'text'
> & {
  text: ProToolbarAsyncState<TContext, string>
  success?: ProToolbarContent<TContext>
  error?: ProToolbarContent<TContext>
  onSuccess?: (text: string, context: TContext) => void | Promise<void>
  onError?: (error: unknown, context: TContext) => void | Promise<void>
}

interface ProToolbarItemBase<TContext> {
  key: string
  hidden?: ProToolbarState<TContext, boolean>
}

export interface ProToolbarButtonItem<TContext>
  extends ProToolbarItemBase<TContext>,
    Omit<
      React.ComponentProps<typeof ProButton>,
      | 'children'
      | 'content'
      | 'copy'
      | 'disabled'
      | 'hidden'
      | 'icon'
      | 'key'
      | 'loading'
      | 'onClick'
      | 'size'
      | 'tooltip'
      | 'type'
    > {
  htmlType?: React.ComponentProps<typeof ProButton>['type']
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  tooltip?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  copy?: ProToolbarCopyOptions<TContext>
  size?: React.ComponentProps<typeof ProButton>['size']
  onClick?: (context: TContext) => void | Promise<void>
}

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
    Omit<
      React.ComponentProps<typeof ProButton>,
      | 'children'
      | 'content'
      | 'copy'
      | 'disabled'
      | 'hidden'
      | 'icon'
      | 'key'
      | 'loading'
      | 'onClick'
      | 'size'
      | 'tooltip'
      | 'type'
    > {
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  tooltip?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  copy?: ProToolbarCopyOptions<TContext>
  size?: React.ComponentProps<typeof ProButton>['size']
  items:
    | ProToolbarMenuOption<TContext>[]
    | ((context: TContext) => ProToolbarMenuOption<TContext>[])
}

export interface ProToolbarDropdownItem<TContext>
  extends ProToolbarItemBase<TContext>,
    Omit<
      React.ComponentProps<typeof ProButton>,
      | 'children'
      | 'content'
      | 'copy'
      | 'disabled'
      | 'hidden'
      | 'icon'
      | 'key'
      | 'loading'
      | 'onClick'
      | 'size'
      | 'tooltip'
      | 'type'
    > {
  label?: ProToolbarContent<TContext>
  icon?: ProToolbarContent<TContext>
  tooltip?: ProToolbarContent<TContext>
  disabled?: ProToolbarState<TContext, boolean>
  loading?: ProToolbarState<TContext, boolean>
  copy?: ProToolbarCopyOptions<TContext>
  size?: React.ComponentProps<typeof ProButton>['size']
  content: ProToolbarContent<TContext>
  contentClassName?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export interface ProToolbarSeparatorItem<TContext> extends ProToolbarItemBase<TContext> {
  separator: true
}

export interface ProToolbarCustomItem<TContext> extends ProToolbarItemBase<TContext> {
  render: (context: TContext) => React.ReactNode
}

export type ProToolbarItem<TContext = unknown> =
  | ProToolbarButtonItem<TContext>
  | ProToolbarMenuItem<TContext>
  | ProToolbarDropdownItem<TContext>
  | ProToolbarSeparatorItem<TContext>
  | ProToolbarCustomItem<TContext>

export interface ProToolbarRegion<TContext> {
  options: ProToolbarItem<TContext>[]
  className?: string
}

export interface ProToolbarProps<TContext = unknown> {
  context?: TContext
  left?: ProToolbarRegion<TContext>
  center?: ProToolbarRegion<TContext>
  right?: ProToolbarRegion<TContext>
  className?: string
}
