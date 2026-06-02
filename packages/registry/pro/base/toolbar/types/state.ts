import type { ReactNode } from 'react'

export type ProToolbarState<TContext, TValue> = TValue | ((context: TContext) => TValue)
export type ProToolbarAsyncState<TContext, TValue> =
  | TValue
  | ((context: TContext) => TValue | Promise<TValue>)
export type ProToolbarContent<TContext> = ReactNode | ((context: TContext) => ReactNode)
