import type { ReactNode } from 'react'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import { imageToolbarButtonClassName } from './classes'

export function imageToolbarButton(
  key: string,
  icon: ReactNode,
  label: string,
  onClick: () => void,
): ProToolbarItem {
  return {
    key,
    icon,
    tooltip: label,
    variant: 'ghost',
    size: 'icon-sm',
    className: imageToolbarButtonClassName,
    onClick,
  }
}
