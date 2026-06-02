type ZodLikeSchema = {
  safeParse?: (value: unknown) => ZodLikeResult
  safeParseAsync?: (value: unknown) => Promise<ZodLikeResult>
}

type ZodLikeResult =
  | { success: true }
  | {
      success: false
      error?: {
        issues?: { message?: string }[]
        errors?: { message?: string }[]
      }
    }

export function normalizeValidator(validator: unknown): unknown {
  if (!isZodLikeSchema(validator)) return validator

  return {
    validator: async (value: unknown) => {
      const result = validator.safeParseAsync
        ? await validator.safeParseAsync(value)
        : validator.safeParse?.(value)

      if (!result || result.success) return ''

      return getZodLikeErrorMessage(result)
    },
  }
}

function getZodLikeErrorMessage(result: Extract<ZodLikeResult, { success: false }>) {
  return result.error?.issues?.[0]?.message ?? result.error?.errors?.[0]?.message ?? 'Invalid value'
}

function isZodLikeSchema(value: unknown): value is ZodLikeSchema {
  if (!isRecord(value)) return false

  return typeof value.safeParse === 'function' || typeof value.safeParseAsync === 'function'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
