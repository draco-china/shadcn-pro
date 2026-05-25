'use client'

import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { Input as ShadcnInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface PasswordProps extends Omit<React.ComponentProps<typeof ShadcnInput>, 'type'> {
  suffix?: React.ReactNode
  inputClassName?: string
}

const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, suffix, inputClassName, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)

    return (
      <div
        className={cn(
          'flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 shadow-xs',
          'transition-[color,box-shadow]',
          'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
          'has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
          'has-disabled:pointer-events-none has-disabled:opacity-50',
          'dark:bg-input/30',
          className,
        )}
      >
        <ShadcnInput
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn(
            'h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent',
            inputClassName,
          )}
          {...props}
        />
        {suffix && (
          <span className="ml-2 shrink-0 select-none text-sm text-muted-foreground">{suffix}</span>
        )}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((value) => !value)}
          className="ml-1.5 shrink-0 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    )
  },
)
Password.displayName = 'Password'

export { Password }
