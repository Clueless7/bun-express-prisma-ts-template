import type {
  Request,
  RequestHandler,
  Response,
} from 'express-serve-static-core'
import type { ErrorMessage } from '../types/ErrorMessageType'

export const handle404: RequestHandler = (
  req: Request,
  res: Response<ErrorMessage>
) => {
  res.status(404).json({ message: 'Not found' })
}
