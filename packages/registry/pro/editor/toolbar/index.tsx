'use client'

import { ProToolbar, type ProToolbarItem } from '@/components/pro/base/toolbar'
import {
  editorToolbarCenterClassName,
  editorToolbarClassName,
  editorToolbarLeftClassName,
  editorToolbarRightClassName,
  editorToolbarTitleClassName,
} from '../classes'
import { getLanguageLabel } from '../language'
import type { EditorToolbarActionContext, EditorToolbarOptions } from '../types'
import { getEditorToolbarRightItems } from './right-items'

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
    typeof title === 'function' ? title(context) : (title ?? getLanguageLabel(language))
  const leftItems: ProToolbarItem<EditorToolbarActionContext>[] = [
    {
      key: 'language',
      render: () => <span className={editorToolbarTitleClassName}>{titleContent}</span>,
    },
  ]
  const rightItems = getEditorToolbarRightItems({
    actions,
    afterActions,
    format,
    copy,
    fullscreenControl,
    fullscreen,
    onFormat,
    onFullscreenChange,
  })
  const center = centerActions?.length
    ? { options: centerActions, className: editorToolbarCenterClassName }
    : undefined

  return (
    <ProToolbar
      context={context}
      className={editorToolbarClassName}
      left={{ options: leftItems, className: editorToolbarLeftClassName }}
      center={center}
      right={{ options: rightItems, className: editorToolbarRightClassName }}
    />
  )
}
