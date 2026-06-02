export interface RateProps {
  value?: number
  onChange?: (value: number) => void
  count?: number
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export interface RateStarProps {
  name: string
  value: number
  active: boolean
  checked: boolean
  disabled?: boolean
  onChange?: (value: number) => void
  onHover: (value: number | null) => void
}
