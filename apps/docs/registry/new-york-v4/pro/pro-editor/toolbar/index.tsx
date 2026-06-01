'use client'

import { Copy, Maximize2, Minimize2, WandSparkles } from 'lucide-react'
import type * as React from 'react'
import { ProToolbar, type ProToolbarItem } from '@/registry/new-york-v4/pro/pro-toolbar'
import { cn } from '@/lib/utils'
import { getLanguageLabel } from '../language'
import type { EditorToolbarActionContext, EditorToolbarOptions } from '../types'

export interface EditorToolbarProps {
  language: string
  fullscreen: boolean
  context: EditorToolbarActionContext
  title?: EditorToolbarOptions['title']
  centerActions?: ProToolbarItem<EditorToolbarActionContext>[]
  actions?: ProToolbarItem<EditorToolbarActionContext>[]
  afterActions?: ProToolbarItem<EditorToolbarActionContext>[]
  format?: boolean
  copy?: boolean
  fullscreenControl?: boolean
  onFormat: () => void
  onFullscreenChange: (fullscreen: boolean) => void
}

export function EditorToolbar({
  language,
  fullscreen,
  context,
  title,
  centerActions,
  actions,
  afterActions,
  format = true,
  copy = true,
  fullscreenControl = true,
  onFormat,
  onFullscreenChange,
}: EditorToolbarProps) {
  const titleContent =
    typeof title === 'function' ? title(context) : title ?? getLanguageLabel(language)
  const leftItems: ProToolbarItem<EditorToolbarActionContext>[] = [
    {
      key: 'language',
      render: () => (
        <span className="px-3 text-sm font-medium text-foreground capitalize">
          {titleContent}
        </span>
      ),
    },
  ]
  const rightItems: ProToolbarItem<EditorToolbarActionContext>[] = [
    ...(actions ?? []),
    ...(format
      ? [
          {
            key: 'format',
            icon: <WandSparkles size={14} />,
            tooltip: 'Format',
            'aria-label': 'Format document',
            variant: 'ghost',
            size: 'icon-xs',
            disabled: (context) => context.disabled,
            onClick: onFormat,
          } satisfies ProToolbarItem<EditorToolbarActionContext>,
        ]
      : []),
    ...(copy
      ? [
          {
            key: 'copy',
            icon: <Copy size={14} />,
            tooltip: 'Copy',
            'aria-label': 'Copy',
            variant: 'ghost',
            size: 'icon-xs',
            disabled: (context) => context.disabled,
            copy: {
              text: (context) => context.value,
              success: 'Copied',
            },
          } satisfies ProToolbarItem<EditorToolbarActionContext>,
        ]
      : []),
    ...(fullscreenControl
      ? [
          {
            key: 'fullscreen',
            icon: fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />,
            tooltip: fullscreen ? 'Exit Fullscreen' : 'Fullscreen',
            'aria-label': fullscreen ? 'Exit fullscreen' : 'Fullscreen',
            variant: 'ghost',
            size: 'icon-xs',
            onClick: () => onFullscreenChange(!fullscreen),
          } satisfies ProToolbarItem<EditorToolbarActionContext>,
        ]
      : []),
    ...(afterActions ?? []),
  ]

  return (
    <ProToolbar
      context={context}
      className="h-9 justify-between gap-1 border-b border-input bg-background px-2"
      left={{ options: leftItems, className: 'h-full min-w-0 gap-1 md:flex-1' }}
      center={{ options: centerActions ?? [], className: 'gap-0.5 md:flex-none' }}
      right={{ options: rightItems, className: 'gap-0.5' }}
    />
  )
}

export function EditorToolbarButton({
  active,
  label,
  tooltip,
  type = 'button',
  disabled,
  className,
  onClick,
  children,
  ...buttonProps
}: {
  active?: boolean
  label: string
  tooltip: string
  type?: React.ComponentProps<'button'>['type']
  disabled?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
} & Omit<
  React.ComponentProps<'button'>,
  'children' | 'className' | 'disabled' | 'key' | 'onClick' | 'size'
>) {
  return (
    <ProToolbar
      className="bg-background"
      right={{
        options: [
          {
            key: label,
            icon: children,
            tooltip,
            htmlType: type,
            disabled,
            variant: active ? 'secondary' : 'ghost',
            size: 'icon-xs',
            className: cn('size-7', className),
            onClick,
            ...buttonProps,
          },
        ],
      }}
    />
  )
}
