import type { KeyboardEvent, RefObject } from 'react'

function isDropdownEvent(event: KeyboardEvent) {
  const target = event.target instanceof HTMLElement ? event.target : null
  const activeElement =
    document.activeElement instanceof HTMLElement ? document.activeElement : null

  return (
    target?.closest('[data-slot="dropdown-menu-trigger"], [data-slot="dropdown-menu-content"]') ||
    activeElement?.closest(
      '[data-slot="dropdown-menu-trigger"], [data-slot="dropdown-menu-content"]',
    )
  )
}

export function handleBulkActionsKeyDown({
  event,
  toolbarRef,
  onClear,
}: {
  event: KeyboardEvent
  toolbarRef: RefObject<HTMLDivElement | null>
  onClear: () => void
}) {
  const buttons = toolbarRef.current?.querySelectorAll('button')
  if (!buttons?.length) return

  const activeElement = document.activeElement
  const currentIndex =
    activeElement instanceof HTMLButtonElement ? Array.from(buttons).indexOf(activeElement) : -1

  switch (event.key) {
    case 'ArrowRight': {
      event.preventDefault()
      buttons[(currentIndex + 1) % buttons.length]?.focus()
      break
    }
    case 'ArrowLeft': {
      event.preventDefault()
      buttons[currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1]?.focus()
      break
    }
    case 'Home': {
      event.preventDefault()
      buttons[0]?.focus()
      break
    }
    case 'End': {
      event.preventDefault()
      buttons[buttons.length - 1]?.focus()
      break
    }
    case 'Escape': {
      if (isDropdownEvent(event)) return

      event.preventDefault()
      onClear()
      break
    }
  }
}
