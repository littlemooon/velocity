import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { expressLogger } from './logger'
import session from './middleware/session'

const app = require('express')()

app.use(expressLogger)

app.use(helmet())

app.use(session)

app.use(cookieParser())

app.set('trust proxy', 1)

export default app
