import morgan from 'morgan'
import rfs from 'rotating-file-stream'

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: 'logs',
})

export const morganRotatingLog = morgan('combined', { stream: accessLogStream })
