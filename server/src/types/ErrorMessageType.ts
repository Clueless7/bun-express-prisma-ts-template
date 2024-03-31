import type { ZodIssue } from 'zod'

export type ErrorMessage = {
  message: string | ZodIssue[]
}
