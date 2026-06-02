export interface ImageViewerProps {
  images: string | string[]
  open: boolean
  onClose: () => void
  index?: number
  initialIndex?: number
  onIndexChange?: (index: number) => void
  alt?: string
  container?: Element | DocumentFragment | null
  className?: string
  toolbarClassName?: string
  thumbnailsClassName?: string
}
