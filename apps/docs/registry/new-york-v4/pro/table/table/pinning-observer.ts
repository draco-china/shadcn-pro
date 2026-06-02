export function getTableColumnWidths(tableElement: HTMLTableElement) {
  const widths = new Map<string, number>()

  tableElement.querySelectorAll<HTMLElement>('[data-pro-table-column-id]').forEach((element) => {
    const columnId = element.dataset.proTableColumnId
    if (!columnId || widths.has(columnId)) return
    widths.set(columnId, element.getBoundingClientRect().width)
  })

  return widths
}

export function observeTableColumnWidths(tableElement: HTMLTableElement, onResize: () => void) {
  if (typeof ResizeObserver === 'undefined') return undefined

  const observer = new ResizeObserver(onResize)
  observer.observe(tableElement)
  tableElement.querySelectorAll<HTMLElement>('[data-pro-table-column-id]').forEach((element) => {
    observer.observe(element)
  })

  return () => observer.disconnect()
}
