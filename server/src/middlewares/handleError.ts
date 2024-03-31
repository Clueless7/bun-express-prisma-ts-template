import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'
import type { ErrorRequestHandler } from 'express-serve-static-core'

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(422).json({ message: 'Invalid JSON' })
  }

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        res.status(409).json({ message: 'Resource already exists' })
        break
      case 'P2025':
        res.status(404).json({ message: 'Resource not found' })
        break
      default:
        res.status(400).json({ message: err.message })
    }

    return
  }

  if (err instanceof PrismaClientUnknownRequestError) {
    return res
      .status(500)
      .json({ message: 'Prisma client unknown request error' })
  }

  res.status(500).json({ message: 'Internal server error' })

  next(err)
}
