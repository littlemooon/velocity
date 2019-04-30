import * as express from 'express'
import env from '../../env'
import createLogger from '../logger'
import { clearAuthUser, oauthClient, setAuthUser } from '../utils/auth.util'
import { getSession, setSession } from '../utils/session.util'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

const router = express.Router()
const baseUrl = env.baseUrl

router.get('/', async (req, res) => {
  const { user, tokens } = getSession(req)
  res.send({
    user: user || {},
    token: tokens ? tokens.access_token : undefined,
  })
})

router.get('/google', async (req, res) => {
  try {
    const { redirect } = req.query
    logger.info(`Logging into google from: ${redirect}`)
    setSession(req, { redirect })

    const url = await oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: env.authScopes,
    })

    logger.info(`Redirecting to ${url}`)

    res.redirect(url)
  } catch (e) {
    logger.error('Error when generating google url', e)
    clearAuthUser(req)
    res.redirect(`${baseUrl}/auth/login?error=${e.message}`)
  }
})

router.get('/google/callback', async (req, res) => {
  try {
    const redirect = getSession(req).redirect || '/'
    const code = req.query.code
    logger.info(`Returned from google with code: ${code}`)

    const { tokens } = await oauthClient.getToken(code)

    await setAuthUser(req, tokens)

    res.redirect(`${baseUrl}${redirect}`)
  } catch (e) {
    logger.error('Error when getting google token', e)
    clearAuthUser(req)
    res.redirect(`${baseUrl}/auth/login?error=${e.message}`)
  }
})

router.get('/logout', async (req, res) => {
  logger.info('Logging out')
  clearAuthUser(req)

  res.redirect(`${baseUrl}/`)
})

export default router
