import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { imageViewerToolbarCountClassName } from './classes'
import type { ImageViewerToolbarItemsOptions } from './toolbar-items'

export function getImageViewerCenterToolbarItems({
  count,
  index,
}: ImageViewerToolbarItemsOptions): ProToolbarItem[] {
  if (count <= 1) return []

  return [
    {
      key: 'count',
      render: () => (
        <span className={imageViewerToolbarCountClassName}>
          {index + 1} / {count}
        </span>
      ),
    },
  ]
}
