import type { ReactNode } from 'react'
import type { ProToolbarButtonItem } from './button'
import type { ProToolbarMenuItem } from './menu'
import type { ProToolbarState } from './state'

export interface ProToolbarItemBase<TContext> {
  key: string
  hidden?: ProToolbarState<TContext, boolean>
}

export interface ProToolbarSeparatorItem<TContext> extends ProToolbarItemBase<TContext> {
  separator: true
}

export interface ProToolbarCustomItem<TContext> extends ProToolbarItemBase<TContext> {
  render: (context: TContext) => ReactNode
}

export type ProToolbarItem<TContext = unknown> =
  | ProToolbarButtonItem<TContext>
  | ProToolbarMenuItem<TContext>
  | ProToolbarSeparatorItem<TContext>
  | ProToolbarCustomItem<TContext>
