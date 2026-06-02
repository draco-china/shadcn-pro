'use client'

import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'
import {
  drawerFormContentClassName,
  drawerFormFooterClassName,
  drawerFormHandleClassName,
  drawerFormHeaderClassName,
  drawerFormTitleClassName,
  overlayFormBackdropClassName,
  overlayFormDescriptionClassName,
} from './classes'
import type {
  OverlayElementContentProps,
  OverlayElementRootProps,
  OverlayElementTextProps,
  OverlayElementTriggerProps,
} from './element-types'

interface DrawerRootProps extends OverlayElementRootProps {
  direction?: 'top' | 'right' | 'bottom' | 'left'
}

export function DrawerRoot(props: DrawerRootProps) {
  return <DrawerPrimitive.Root data-slot="drawer-form-root" {...props} />
}

export function DrawerTrigger(props: OverlayElementTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-form-trigger" {...props} />
}

export function DrawerContent({ className, children, ...props }: OverlayElementContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className={overlayFormBackdropClassName} />
      <DrawerPrimitive.Content
        data-slot="drawer-form-content"
        className={cn(drawerFormContentClassName, className)}
        {...props}
      >
        <div className={drawerFormHandleClassName} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

export function DrawerHeader({ className, ...props }: OverlayElementContentProps) {
  return (
    <div
      data-slot="drawer-form-header"
      className={cn(drawerFormHeaderClassName, className)}
      {...props}
    />
  )
}

export function DrawerFooter({ className, ...props }: OverlayElementContentProps) {
  return (
    <div
      data-slot="drawer-form-footer"
      className={cn(drawerFormFooterClassName, className)}
      {...props}
    />
  )
}

export function DrawerTitle({ className, children }: OverlayElementTextProps) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-form-title"
      className={cn(drawerFormTitleClassName, className)}
    >
      {children}
    </DrawerPrimitive.Title>
  )
}

export function DrawerDescription({ className, children }: OverlayElementTextProps) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-form-description"
      className={cn(overlayFormDescriptionClassName, className)}
    >
      {children}
    </DrawerPrimitive.Description>
  )
}
