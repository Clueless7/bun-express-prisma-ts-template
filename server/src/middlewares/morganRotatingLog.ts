import morgan from 'morgan'
import rfs from 'rotating-file-stream'

const LOG_INTERVAL = '1d' // every 1 day
const LOG_PATH = 'logs' // in the "logs" folder, this should be made dynamic in production by using path

const accessLogStream = rfs.createStream('access.log', {
  interval: LOG_INTERVAL,
  path: LOG_PATH,
})

export const morganRotatingLog = morgan('combined', { stream: accessLogStream })
