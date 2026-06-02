'use client'

import { Copy, WandSparkles } from 'lucide-react'
import { FullscreenButton } from '@/components/pro/base/button/fullscreen'
import type { ProToolbarItem } from '@/components/pro/base/toolbar'
import type { EditorToolbarActionContext } from '../types'

export interface EditorToolbarRightItemsOptions {
  actions?: ProToolbarItem<EditorToolbarActionContext>[]
  afterActions?: ProToolbarItem<EditorToolbarActionContext>[]
  format?: boolean
  copy?: boolean
  fullscreenControl?: boolean
  fullscreen: boolean
  onFormat: () => void
  onFullscreenChange: (fullscreen: boolean) => void
}

export function getEditorToolbarRightItems({
  actions,
  afterActions,
  ...options
}: EditorToolbarRightItemsOptions) {
  return [
    ...(actions ?? []),
    ...getEditorToolbarBuiltInRightItems(options),
    ...(afterActions ?? []),
  ]
}

function getEditorToolbarBuiltInRightItems({
  format,
  copy,
  fullscreenControl,
  fullscreen,
  onFormat,
  onFullscreenChange,
}: Omit<EditorToolbarRightItemsOptions, 'actions' | 'afterActions'>) {
  const items: Array<false | undefined | ProToolbarItem<EditorToolbarActionContext>> = [
    format && {
      key: 'format',
      icon: <WandSparkles size={14} />,
      tooltip: 'Format',
      variant: 'ghost',
      size: 'icon-xs',
      disabled: (context) => context.disabled,
      onClick: onFormat,
    },
    copy && {
      key: 'copy',
      icon: <Copy size={14} />,
      tooltip: 'Copy',
      variant: 'ghost',
      size: 'icon-xs',
      disabled: (context) => context.disabled,
      copy: {
        text: (context) => context.value,
        success: 'Copied',
      },
    },
    fullscreenControl && {
      key: 'fullscreen',
      render: () => (
        <FullscreenButton
          fullscreen={{
            value: fullscreen,
            enter: 'Fullscreen',
            exit: 'Exit fullscreen',
            onChange: onFullscreenChange,
          }}
          variant="ghost"
          size="icon-xs"
        />
      ),
    },
  ]

  return items.filter(isEditorToolbarItem)
}

function isEditorToolbarItem(
  item: false | undefined | ProToolbarItem<EditorToolbarActionContext>,
): item is ProToolbarItem<EditorToolbarActionContext> {
  return item !== false && item !== undefined
}
