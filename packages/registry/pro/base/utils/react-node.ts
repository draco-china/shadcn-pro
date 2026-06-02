import type { ReactNode } from 'react'

export function isRenderableNode(node: ReactNode) {
  return node !== undefined && node !== null && node !== false
}
