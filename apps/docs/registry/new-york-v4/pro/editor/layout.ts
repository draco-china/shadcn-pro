import type { CSSProperties } from 'react'

export function getEditorLayout({
  height,
  fullscreen,
  fixedFullscreen,
}: {
  height?: string | number
  fullscreen: boolean
  fixedFullscreen: boolean
}) {
  const hasExplicitHeight = height !== undefined
  const contentHeight =
    typeof height === 'number' ? `${height}px` : hasExplicitHeight ? height : undefined

  return {
    contentStyle:
      hasExplicitHeight && !fullscreen
        ? ({ height: contentHeight } satisfies CSSProperties)
        : undefined,
    contentFillsParent: fullscreen || !hasExplicitHeight,
    rootStyle:
      fixedFullscreen && hasExplicitHeight
        ? ({ height: contentHeight } satisfies CSSProperties)
        : undefined,
  }
}
