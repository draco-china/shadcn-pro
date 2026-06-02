export interface SliderProps {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  inverted?: boolean
  orientation?: 'horizontal' | 'vertical'
  showValue?: boolean
  className?: string
  wrapperClassName?: string
}
