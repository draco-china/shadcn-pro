'use client'

import { LoaderCircle } from 'lucide-react'
import { Slot } from 'radix-ui'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonLoadingIconClassName } from './classes'
import { buttonVariants, type ProButtonSize, type ProButtonVariant } from './variants'

export type { ProButtonSize, ProButtonVariant }
export { buttonVariants }

export interface ProButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'prefix' | 'size'> {
  asChild?: boolean
  variant?: ProButtonVariant
  size?: ProButtonSize
  prefix?: ReactNode
  suffix?: ReactNode
  loading?: boolean
  children?: ReactNode
}

export function ProButton({
  asChild,
  disabled,
  type = 'button',
  variant,
  size,
  className,
  prefix,
  suffix,
  loading,
  'aria-disabled': ariaDisabled,
  children,
  ...props
}: ProButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  const disabledState = disabled || loading

  return (
    <Comp
      type={type}
      data-slot="pro-button"
      data-variant={variant}
      data-size={size}
      disabled={disabledState}
      aria-disabled={ariaDisabled ?? (disabledState ? true : undefined)}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {loading ? <LoaderCircle className={buttonLoadingIconClassName} /> : prefix}
      {children}
      {suffix}
    </Comp>
  )
}
