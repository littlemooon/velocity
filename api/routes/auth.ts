import * as express from 'express'
import env from '../../env'
import logger from '../logger'
import { clearAuthUser, oauthClient, setAuthUser } from '../utils/auth-utils'
import { getSession, setSession } from '../utils/session-utils'

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
    logger.info('/google: Logging into google from ', redirect)
    setSession(req, { redirect })

    const url = await oauthClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: env.authScopes,
    })

    logger.info('/google: Redirecting to %s', url)

    res.redirect(url)
  } catch (e) {
    logger.error('/google:', e)
    clearAuthUser(req)
    res.status(500).send({ status: 'unable_to_get_url', message: e.message })
  }
})

router.get('/google/callback', async (req, res) => {
  try {
    const redirect = getSession(req).redirect || '/'
    const code = req.query.code
    logger.info('/google/callback: Returned from google with code', code)

    const { tokens } = await oauthClient.getToken(code)

    await setAuthUser(req, tokens)

    res.redirect(`${baseUrl}${redirect}`)
  } catch (e) {
    logger.error('/google/callback:', e)
    clearAuthUser(req)
    res.status(500).send({ status: 'unable_to_login', message: e.message })
  }
})

router.get('/logout', async (req, res) => {
  logger.info('/logout: Logging out')
  clearAuthUser(req)

  res.redirect(`${baseUrl}/`)
})

export default router
