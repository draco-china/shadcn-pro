import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { alertSurfaceClass, alertTextClass, getAlertType, MarkdownAlertIcon } from './alert-style'
import { markdownAlertClassName, markdownAlertTitleClassName } from './classes'

export function isMarkdownAlert(classNames: string) {
  return classNames.includes('markdown-alert') && !isMarkdownAlertTitle(classNames)
}

export function isMarkdownAlertTitle(classNames: string) {
  return classNames.includes('markdown-alert-title')
}

export function MarkdownAlert({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const type = getAlertType(String(className ?? ''))

  return (
    <div className={cn(markdownAlertClassName, alertSurfaceClass(type))} {...props}>
      {children}
    </div>
  )
}

export function MarkdownAlertTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const type = getAlertType(String(className ?? ''))

  return (
    <div className={cn(markdownAlertTitleClassName, alertTextClass(type))} {...props}>
      <MarkdownAlertIcon type={type} />
      <span>{children}</span>
    </div>
  )
}
