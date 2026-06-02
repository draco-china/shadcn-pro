export const overlayFormBackdropClassName =
  'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0'

export const modalFormContentClassName =
  'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg'

export const modalFormCloseClassName =
  'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4'

export const modalFormCloseTextClassName = 'sr-only'

export const modalFormHeaderClassName = 'flex flex-col gap-2 text-center sm:text-left'

export const modalFormFooterClassName = 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'

export const modalFormTitleClassName = 'text-lg leading-none font-semibold'

export const overlayFormDescriptionClassName = 'text-sm text-muted-foreground'

export const drawerFormContentClassName =
  'group/drawer-content fixed z-50 flex h-auto flex-col bg-background data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm'

export const drawerFormHandleClassName =
  'mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block'

export const drawerFormHeaderClassName =
  'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left'

export const drawerFormFooterClassName = 'mt-auto flex flex-col gap-2 p-4'

export const drawerFormTitleClassName = 'font-semibold text-foreground'

export const overlayFormRootClassName = 'flex flex-1 flex-col overflow-hidden'

export const overlayFormBodyClassName = 'flex-1 overflow-y-auto py-2'

export const overlayFormSubmitterClassName = 'w-full justify-end'

export const overlayFormDrawerContentClassName = 'flex flex-col'

export const overlayFormHeaderClassName = 'shrink-0'

export const overlayFormDrawerBodyClassName = 'px-4'

export const overlayFormDrawerFooterClassName = 'shrink-0'

export const overlayFormModalContentClassName = 'flex max-h-[90vh] flex-col'

export const overlayFormModalBodyClassName = 'px-1'

export const overlayFormModalFooterClassName = 'shrink-0 pt-4'
