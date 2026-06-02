export function shouldShowInputClear({
  allowClear,
  value,
  disabled,
  readOnly,
}: {
  allowClear: boolean | undefined
  value: unknown
  disabled?: boolean
  readOnly?: boolean
}) {
  return (
    !!allowClear && value !== '' && value !== undefined && value !== null && !disabled && !readOnly
  )
}
