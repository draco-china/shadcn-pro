import type { ProToolbarContent, ProToolbarCopyOptions, ProToolbarState } from '../types'

export function renderToolbarContent<TContext>(
  content: ProToolbarContent<TContext> | undefined,
  context: TContext,
) {
  return typeof content === 'function' ? content(context) : content
}

export function resolveToolbarState<TContext>(
  state: ProToolbarState<TContext, boolean> | undefined,
  context: TContext,
) {
  return typeof state === 'function' ? state(context) : state
}

export function resolveToolbarCopy<TContext>(
  copy: ProToolbarCopyOptions<TContext> | undefined,
  context: TContext,
) {
  if (!copy) return undefined
  const text = copy.text

  return {
    ...copy,
    text: typeof text === 'function' ? () => text(context) : text,
    success: renderToolbarContent(copy.success, context),
    error: renderToolbarContent(copy.error, context),
    onSuccess: (text: string) => copy.onSuccess?.(text, context),
    onError: (error: unknown) => copy.onError?.(error, context),
  }
}
