import { describe, expect, test } from 'bun:test'
import {
  formatMoneyValue,
  normalizeMoneyInput,
  parseMoneyValue,
} from '../pro/base/fields/input/money'
import { validateRequired, withRequiredValidator } from '../pro/form/validators'

describe('money input helpers', () => {
  test('preserves editable decimal and negative states', () => {
    expect(normalizeMoneyInput('1.')).toBe('1.')
    expect(normalizeMoneyInput('-')).toBe('-')
    expect(normalizeMoneyInput('-1.2.5')).toBe('-1.25')
    expect(normalizeMoneyInput('$ 1,234.50')).toBe('1234.50')
  })

  test('parses complete values without inventing values for incomplete input', () => {
    expect(parseMoneyValue('-')).toBeUndefined()
    expect(parseMoneyValue('1.')).toBe(1)
    expect(parseMoneyValue('-1.25')).toBe(-1.25)
    expect(formatMoneyValue(undefined)).toBe('')
  })
})

describe('required form validation', () => {
  test('recognizes empty scalar and array values', () => {
    expect(validateRequired({ value: '' })).toBe('This field is required.')
    expect(validateRequired({ value: [] })).toBe('This field is required.')
    expect(validateRequired({ value: 0 })).toBeUndefined()
    expect(validateRequired({ value: false })).toBeUndefined()
  })

  test('runs required validation before a custom submit validator', () => {
    const validators = withRequiredValidator(true, {
      onSubmit: ({ value }: { value: string }) =>
        value.length < 3 ? 'Enter at least three characters.' : undefined,
    })
    const validate = validators?.onSubmit

    expect(typeof validate).toBe('function')
    if (typeof validate !== 'function') throw new Error('Expected a function validator')
    expect(validate({ value: '' })).toBe('This field is required.')
    expect(validate({ value: 'ab' })).toBe('Enter at least three characters.')
    expect(validate({ value: 'abc' })).toBeUndefined()
  })
})
