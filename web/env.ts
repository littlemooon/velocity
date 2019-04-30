import * as dotenv from 'dotenv'

const dev = process.env.NODE_ENV !== 'production'

dotenv.config({ path: '../.env' })
dotenv.config({ path: dev ? '../.env.dev' : '../.env.prod' })

const port = process.env.PORT || 8888
const apiUrl = process.env.API_URL || 'http://localhost:3333'
const webUrl = process.env.WEB_URL || `http://localhost:${port}`

export default {
  dev,
  port,
  apiUrl,
  webUrl,

  appName: process.env.APP_NAME || 'unvanity',
}
