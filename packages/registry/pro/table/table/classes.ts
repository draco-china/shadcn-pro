export const tableElementClassName = 'w-full caption-bottom text-sm'

export const tableHeaderClassName = '[&_tr]:border-b'

export const tableBodyClassName = '[&_tr:last-child]:border-0'

export const tableRowClassName =
  'border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted'

export const tableHeadCellClassName =
  'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'

export const tableCellClassName =
  'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'

export const tableSkeletonClassName = 'animate-pulse rounded-md bg-accent'

export const tableScrollbarClassName =
  '[scrollbar-gutter:auto] [scrollbar-width:thin] [scrollbar-color:transparent_transparent] hover:[scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:shadow-none [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35'

export const tableSkeletonDragCellClassName =
  'sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))] transition-colors duration-150 group-hover:bg-muted'

export const tableInteractiveRowClassName =
  'group transition-colors duration-150 hover:bg-muted data-[state=selected]:bg-muted'

export const tableSkeletonRowClassName = 'group transition-colors duration-150 hover:bg-muted'

export const tableDragCellClassName =
  'sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))] transition-colors duration-150 group-data-[state=selected]:bg-muted group-hover:bg-muted'

export const tableDragButtonClassName =
  'cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing'

export const tableContentFrameClassName = 'w-full max-w-full overflow-auto rounded-md border'

export const tableContentElementClassName = 'min-w-max'

export const tableFullLayoutSpacerClassName = 'min-h-0 flex-1'

export const tablePaginationFullLayoutClassName = 'shrink-0'

export const tableEmptyCellClassName = 'h-32 text-center text-muted-foreground'

export const tableEmptyStateClassName = 'flex flex-col items-center gap-2'

export const tableEmptyTextClassName = 'text-sm'

export const tableViewHeaderClassName = 'shrink-0'

export const tableHeaderStickyCellClassName = 'sticky top-0 z-10 bg-background'

export const tableHeaderHoverCellClassName = 'transition-colors duration-150 hover:bg-muted'

export const tableHeaderContentClassName = 'flex items-center gap-1.5'

export const tableHeaderDragCellClassName =
  'sticky left-0 z-20 w-8 bg-background pr-0 shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))] transition-colors duration-150 hover:bg-muted'

export const tableHeaderDragStickyClassName = 'top-0 z-30'

export const tablePinnedCellClassName =
  'sticky z-10 bg-background transition-colors duration-150 group-data-[state=selected]:bg-muted group-hover:bg-muted'

export const tablePinnedLeftShadowClassName =
  'shadow-[6px_0_10px_-10px_hsl(var(--foreground)/0.45),1px_0_0_0_hsl(var(--border))]'

export const tablePinnedRightShadowClassName =
  'shadow-[-6px_0_10px_-10px_hsl(var(--foreground)/0.45),-1px_0_0_0_hsl(var(--border))]'

export const tableViewRootClassName = 'max-w-full'

export const tableViewFullLayoutClassName = 'flex h-full min-h-0 flex-col gap-3'

export const tableViewAutoLayoutClassName = 'space-y-3'

export const tableSortIndicatorClassName = 'text-muted-foreground'

export const tableSortUnsortedIconClassName = 'opacity-40'

export const tableSelectionCheckboxClassName = 'translate-y-0.5'

export const tableEmptyIconClassName = 'size-8 opacity-40'

export const tableSkeletonDragHandleClassName = 'size-4'

export const tableSkeletonCellClassName = 'h-4 w-full'
