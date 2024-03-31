import cors from 'cors'
import express from 'express'
import { handle404 } from './middlewares/handle404'
import { handleError } from './middlewares/handleError'
import { morganRotatingLog } from './middlewares/morganRotatingLog'
import userRoutes from './routes/users.route'

export const createApp = () => {
  const app = express()

  app.use(morganRotatingLog)

  app.use(
    cors({
      origin: ['*'], // Change this depending on your frontend URL
    })
  )

  app.use(express.json())

  app.use('/api/users', userRoutes)

  app.use(handleError)

  app.use(handle404)

  return app
}
