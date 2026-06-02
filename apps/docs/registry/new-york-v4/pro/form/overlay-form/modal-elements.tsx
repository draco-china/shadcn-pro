'use client'

import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'
import {
  modalFormCloseClassName,
  modalFormCloseTextClassName,
  modalFormContentClassName,
  modalFormFooterClassName,
  modalFormHeaderClassName,
  modalFormTitleClassName,
  overlayFormBackdropClassName,
  overlayFormDescriptionClassName,
} from './classes'
import type {
  OverlayElementContentProps,
  OverlayElementRootProps,
  OverlayElementTextProps,
  OverlayElementTriggerProps,
} from './element-types'

export function ModalRoot(props: OverlayElementRootProps) {
  return <DialogPrimitive.Root data-slot="modal-form-root" {...props} />
}

export function ModalTrigger(props: OverlayElementTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="modal-form-trigger" {...props} />
}

export function ModalContent({ className, children, ...props }: OverlayElementContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayFormBackdropClassName} />
      <DialogPrimitive.Content
        data-slot="modal-form-content"
        className={cn(modalFormContentClassName, className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className={modalFormCloseClassName}>
          <XIcon />
          <span className={modalFormCloseTextClassName}>Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function ModalHeader({ className, ...props }: OverlayElementContentProps) {
  return (
    <div
      data-slot="modal-form-header"
      className={cn(modalFormHeaderClassName, className)}
      {...props}
    />
  )
}

export function ModalFooter({ className, ...props }: OverlayElementContentProps) {
  return (
    <div
      data-slot="modal-form-footer"
      className={cn(modalFormFooterClassName, className)}
      {...props}
    />
  )
}

export function ModalTitle({ className, children }: OverlayElementTextProps) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-form-title"
      className={cn(modalFormTitleClassName, className)}
    >
      {children}
    </DialogPrimitive.Title>
  )
}

export function ModalDescription({ className, children }: OverlayElementTextProps) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-form-description"
      className={cn(overlayFormDescriptionClassName, className)}
    >
      {children}
    </DialogPrimitive.Description>
  )
}
