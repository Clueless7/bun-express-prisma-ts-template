import pc from 'picocolors'
import { createApp } from './createApp'
import './db'
import { checkEnv } from './utils/checkEnv'

checkEnv()

const SERVER_PORT = process.env.SERVER_PORT!

const app = createApp()

app.listen(SERVER_PORT, () => {
  console.log(pc.green(`Server running on port ${SERVER_PORT}`))
})
