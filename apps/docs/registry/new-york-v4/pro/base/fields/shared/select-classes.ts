export const fieldSelectContentClassName =
  'relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'

export const fieldSelectPopperContentClassName =
  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'

export const fieldSelectViewportClassName = 'p-1'

export const fieldSelectPopperViewportClassName =
  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'

export const fieldSelectScrollButtonClassName =
  'flex cursor-default items-center justify-center py-1'

export const fieldSelectIconClassName = 'size-4 opacity-50'

export const fieldSelectScrollIconClassName = 'size-4'

export const fieldSelectItemIndicatorClassName =
  'absolute right-2 flex size-3.5 items-center justify-center'

export const fieldSelectItemIndicatorIconClassName = 'size-4'

export const fieldSelectTriggerValueClassName =
  'data-[placeholder]:text-muted-foreground *:data-[slot=field-select-value]:line-clamp-1 *:data-[slot=field-select-value]:flex *:data-[slot=field-select-value]:items-center *:data-[slot=field-select-value]:gap-2'

export const fieldSelectItemClassName =
  'relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2'
