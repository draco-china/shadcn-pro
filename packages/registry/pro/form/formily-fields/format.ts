export function formatMoney(value: number, precision: number, currency: string) {
  return `${currency} ${value.toLocaleString('en-US', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })}`
}
