import { X } from 'lucide-react'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { imageToolbarCloseIconClassName } from './classes'
import { imageToolbarButton } from './toolbar-button'
import type { ImageViewerToolbarItemsOptions } from './toolbar-items'

export function getImageViewerRightToolbarItems({
  onClose,
}: ImageViewerToolbarItemsOptions): ProToolbarItem[] {
  return [
    imageToolbarButton(
      'close',
      <X className={imageToolbarCloseIconClassName} />,
      'Close image viewer',
      onClose,
    ),
  ]
}
