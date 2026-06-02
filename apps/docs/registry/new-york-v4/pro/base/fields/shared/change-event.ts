import type { ChangeEvent } from 'react'

type ChangeEventElement = HTMLInputElement | HTMLTextAreaElement

export function createFieldChangeEvent<TElement extends ChangeEventElement>(
  field: TElement,
  event?: object,
): ChangeEvent<TElement> {
  return {
    ...event,
    target: field,
    currentTarget: field,
  } as ChangeEvent<TElement>
}
