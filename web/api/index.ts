import cookieParser from 'cookie-parser'
import cors from 'cors'
import httpProxy from 'http-proxy'
import env from '../env'

const app = require('express')()

app.use(cors())
app.use(cookieParser())

const api = httpProxy.createProxyServer({
  changeOrigin: true,
})

app.use('/api', (req, res) => {
  return api.web(req, res, { target: env.apiUrl }, (err: Error) => {
    if (err) {
      res.status(500).send({ status: 'unknown_error', message: err.message })
    }
  })
})

export default app
