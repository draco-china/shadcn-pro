export const commandMenuContentClassName =
  'z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'

export const commandMenuRootClassName =
  'flex size-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground'

export const commandMenuSearchClassName = 'flex h-9 items-center gap-2 border-b px-3'

export const commandMenuSearchIconClassName = 'size-4 shrink-0 opacity-50'

export const commandMenuSearchInputClassName =
  'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'

export const commandMenuListClassName =
  'max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto'

export const commandMenuEmptyClassName = 'py-6 text-center text-sm'

export const commandMenuGroupClassName =
  'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground'

export const commandMenuSeparatorClassName = '-mx-1 h-px bg-border'

export const commandMenuItemClassName =
  "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"
