import { CircleCheckIcon, InfoIcon, type LucideIcon, TriangleAlertIcon } from 'lucide-react'
import { markdownAlertIconClassName } from './classes'
import type { AlertType } from './types'

const alertTypes: AlertType[] = ['note', 'tip', 'important', 'warning', 'caution']

export const alertLabels: Record<AlertType, string> = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
}

const alertSurfaceClasses: Record<AlertType, string> = {
  note: 'border-blue-500/30 bg-blue-500/5 text-foreground',
  tip: 'border-green-500/30 bg-green-500/5 text-foreground',
  important: 'border-purple-500/30 bg-purple-500/5 text-foreground',
  warning: 'border-amber-500/35 bg-amber-500/10 text-foreground',
  caution: 'border-red-500/30 bg-red-500/5 text-foreground',
}

const alertTextClasses: Record<AlertType, string> = {
  note: 'text-blue-600 dark:text-blue-400',
  tip: 'text-green-600 dark:text-green-400',
  important: 'text-purple-600 dark:text-purple-400',
  warning: 'text-amber-700 dark:text-amber-400',
  caution: 'text-red-600 dark:text-red-400',
}

const alertIcons: Record<AlertType, LucideIcon> = {
  note: InfoIcon,
  tip: CircleCheckIcon,
  important: InfoIcon,
  warning: TriangleAlertIcon,
  caution: TriangleAlertIcon,
}

export function getAlertType(classNames: string): AlertType {
  return (
    alertTypes.find(
      (type) =>
        classNames.includes(`markdown-alert-${type}`) ||
        classNames.includes(`markdown-alert-title-${type}`),
    ) ?? 'note'
  )
}

export function getAlertTypeFromValue(value: string): AlertType | undefined {
  const type = value.toLowerCase()
  return isAlertType(type) ? type : undefined
}

export function MarkdownAlertIcon({ type }: { type: AlertType }) {
  const Icon = alertIcons[type]
  return <Icon className={markdownAlertIconClassName} aria-hidden="true" />
}

export function alertSurfaceClass(type: AlertType) {
  return alertSurfaceClasses[type]
}

export function alertTextClass(type: AlertType) {
  return alertTextClasses[type]
}

function isAlertType(value: string): value is AlertType {
  return alertTypes.includes(value as AlertType)
}
