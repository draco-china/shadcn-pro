import type { ProToolbarButtonSize, ProToolbarButtonVariant } from './button'
import type { ProToolbarItem } from './item'

export interface ProToolbarRegion<TContext> {
  options: ProToolbarItem<TContext>[]
  className?: string
}

export interface ProToolbarProps<TContext = undefined> {
  context?: TContext
  left?: ProToolbarRegion<TContext>
  center?: ProToolbarRegion<TContext>
  right?: ProToolbarRegion<TContext>
  variant?: ProToolbarButtonVariant
  size?: ProToolbarButtonSize
  className?: string
}
