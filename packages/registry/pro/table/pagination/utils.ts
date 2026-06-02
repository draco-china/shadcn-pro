export function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 5) return range(1, total)

  if (current <= 3) return [1, ...range(2, 4), '...', total]
  if (current >= total - 2) return [1, '...', ...range(total - 3, total)]

  return [1, '...', ...range(current - 1, current + 1), '...', total]
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index)
}
