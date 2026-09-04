import { X } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { ProButton } from '../../button'

/** Shared input shell classes used by composite fields. */
export const fieldShellClassName =
  'flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:has-aria-invalid:ring-destructive/40'

/** Shared trigger classes used by popover-backed fields. */
export const fieldTriggerClassName =
  'flex h-9 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground'

/** Inline clear button for input shells. */
export function FieldClearButton({
  label = 'Clear value',
  className,
  onClear,
}: {
  label?: string
  className?: string
  onClear: () => void
}) {
  return (
    <ProButton
      variant="ghost"
      size="icon-sm"
      tabIndex={-1}
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onClick={(event) => {
        event.stopPropagation()
        onClear()
      }}
      className={cn('ml-1.5', className)}
    >
      <X />
    </ProButton>
  )
}

/** Clear affordance for fields whose trigger is already a button. */
export function FieldClearAction({
  label = 'Clear value',
  className,
  onClear,
}: {
  label?: string
  className?: string
  onClear: () => void
}) {
  function clear(event: { preventDefault: () => void; stopPropagation: () => void }) {
    event.preventDefault()
    event.stopPropagation()
    onClear()
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: field triggers are buttons, so the clear affordance cannot be a nested button.
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      className={cn(
        "inline-flex size-4 items-center justify-center rounded-sm outline-hidden [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onPointerDown={clear}
      onClick={clear}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        clear(event)
      }}
    >
      <X />
    </span>
  )
}

/** Consistent popover surface for field controls. */
export function FieldPopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="field-popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
