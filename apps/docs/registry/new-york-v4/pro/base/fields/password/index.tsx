'use client'

import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Input } from '../input'
import { FieldIconButton } from '../shared/field'
import type { PasswordProps } from './types'

export type { PasswordProps } from './types'

const Password = forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, suffix, inputClassName, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <Input
        ref={ref}
        {...props}
        type={visible ? 'text' : 'password'}
        className={className}
        inputClassName={inputClassName}
        suffix={[
          suffix,
          <FieldIconButton
            key="visibility"
            tabIndex={-1}
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </FieldIconButton>,
        ]}
      />
    )
  },
)
Password.displayName = 'Password'

export { Password }
