import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function ImageViewerPortal({
  container,
  children,
}: {
  container?: Element | DocumentFragment | null
  children: ReactNode
}) {
  const portalTarget =
    container === undefined ? (typeof document === 'undefined' ? null : document.body) : container

  return portalTarget ? createPortal(children, portalTarget) : children
}
