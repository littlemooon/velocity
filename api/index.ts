import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as helmet from 'helmet'
import env from './env'
import createLogger, { expressErrorLogger, expressLogger } from './logger'
import { requireAuth } from './middleware/authenticate'
import session from './middleware/session'
import analytics from './routes/analytics.route'
import auth from './routes/auth.route'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

const app = require('express')()

app.use(expressLogger)
app.use(cors({ origin: env.webUrl }))
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(helmet())
app.use(session)
app.use(cookieParser())
app.set('trust proxy', 1)

app.use('/auth', auth)
app.use('/analytics', requireAuth, analytics)

app.use('*', (req, res) => {
  res.status(404).end(`bloop ${req.params[0]}`)
})

app.use(expressErrorLogger)

app.listen(env.port, (err: Error) => {
  if (err) {
    throw err
  }
  logger.info(`> Ready on ${env.apiUrl}`)
})
