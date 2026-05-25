export function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, index) => index + 1)

  const items: (number | '...')[] = [1]

  if (current <= 3) {
    for (let page = 2; page <= 4; page++) items.push(page)
    items.push('...', total)
  } else if (current >= total - 2) {
    items.push('...')
    for (let page = total - 3; page <= total; page++) items.push(page)
  } else {
    items.push('...')
    for (let page = current - 1; page <= current + 1; page++) items.push(page)
    items.push('...', total)
  }

  return items
}
