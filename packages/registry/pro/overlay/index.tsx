'use client'

import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { type ReactNode, useState } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'
import { ProButton } from '../base/button'

/** Accessible modal shell built on Radix Dialog. */
export function ProModal({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}: {
  trigger?: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger != null && (
        <DialogPrimitive.Trigger data-slot="pro-modal-trigger" asChild>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={
            'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
          }
        />
        <DialogPrimitive.Content
          data-slot="pro-modal-content"
          className={cn(
            'fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg',
            'flex max-h-[90vh] flex-col',
            className,
          )}
        >
          <div
            data-slot="pro-modal-header"
            className="flex shrink-0 flex-col gap-2 text-center sm:text-left"
          >
            <DialogPrimitive.Title
              data-slot="pro-modal-title"
              className="text-lg leading-none font-semibold"
            >
              {title}
            </DialogPrimitive.Title>
            {description != null && (
              <DialogPrimitive.Description
                data-slot="pro-modal-description"
                className="text-sm text-muted-foreground"
              >
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          {children}
          <DialogPrimitive.Close asChild>
            <ProButton
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              className="absolute top-4 right-4 opacity-70 hover:opacity-100"
            >
              <XIcon />
            </ProButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** Directional drawer shell built on Vaul. */
export function ProDrawer({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  side = 'right',
  className,
}: {
  trigger?: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} direction={side}>
      {trigger != null && (
        <DrawerPrimitive.Trigger data-slot="pro-drawer-trigger" asChild>
          {trigger}
        </DrawerPrimitive.Trigger>
      )}
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay
          className={
            'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'
          }
        />
        <DrawerPrimitive.Content
          data-slot="pro-drawer-content"
          className={cn(
            'group/drawer-content fixed z-50 flex h-auto flex-col bg-background data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm',
            className,
          )}
        >
          <div
            className={
              'mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block'
            }
          />
          <div
            data-slot="pro-drawer-header"
            className={
              'flex shrink-0 flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left'
            }
          >
            <DrawerPrimitive.Title
              data-slot="pro-drawer-title"
              className="font-semibold text-foreground"
            >
              {title}
            </DrawerPrimitive.Title>
            {description != null && (
              <DrawerPrimitive.Description
                data-slot="pro-drawer-description"
                className="text-sm text-muted-foreground"
              >
                {description}
              </DrawerPrimitive.Description>
            )}
          </div>
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

/** Confirmation dialog with guarded async submission. */
export function ProConfirm({
  trigger,
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  variant = 'destructive',
  className,
}: {
  trigger?: ReactNode
  title: ReactNode
  description?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm?: () => void | Promise<void>
  cancelText?: ReactNode
  confirmText?: ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  function setOpen(value: boolean) {
    if (open === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }

  return (
    <ProModal
      trigger={trigger}
      title={title}
      description={description}
      open={open ?? internalOpen}
      onOpenChange={setOpen}
      className={className}
    >
      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <ProButton variant="outline" disabled={loading} onClick={() => setOpen(false)}>
          {cancelText}
        </ProButton>
        <ProButton
          variant={variant}
          loading={loading}
          onClick={async () => {
            if (loading) return

            setLoading(true)
            try {
              await onConfirm?.()
              setOpen(false)
            } finally {
              setLoading(false)
            }
          }}
        >
          {confirmText}
        </ProButton>
      </div>
    </ProModal>
  )
}
