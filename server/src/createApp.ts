import express from 'express'
import { handle404 } from './middlewares/handle404'
import { handleError } from './middlewares/handleError'
import userRoutes from './routes/users.route'
import morgan from 'morgan'
import cors from 'cors'
import rfs from 'rotating-file-stream'

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: 'logs',
})

export const createApp = () => {
  const app = express()

  app.use(
    cors({
      origin: ['*'], // Change this depending on your frontend URL
    })
  )

  app.use(express.json())

  app.use(morgan('common', { stream: accessLogStream }))

  app.use('/api/users', userRoutes)

  app.use(handleError)

  app.use(handle404)

  return app
}
