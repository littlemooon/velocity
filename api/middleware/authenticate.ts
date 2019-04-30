import * as express from 'express'
import createLogger from '../logger'
import { oauthClient, setAuthUser } from '../utils/auth.util'
import { getSession } from '../utils/session.util'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export async function validateQueryToken(
  req: express.Request,
  res: express.Response
) {
  const queryToken = req.query.token

  if (queryToken) {
    try {
      logger.info('Verifying query token', queryToken)

      const info = await oauthClient.getTokenInfo(queryToken)
      if (info.user_id) {
        logger.info('Found user for query token', info)

        await setAuthUser(req, { access_token: queryToken })
      } else {
        logger.warn('Failed to validate query token', {
          queryToken,
          info,
        })
        return res
          .status(401)
          .send({ status: 'auth_required', message: 'You must be logged in' })
      }
    } catch (e) {
      logger.error('Error when validating query token', e)
      return res.status(500).send({
        status: 'unable_to_verify_token',
        message: e.message,
      })
    }
  }
}

export async function requireAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const isAuthed = getSession(req).tokens

  if (!isAuthed) {
    return res
      .status(401)
      .send({ status: 'auth_required', message: 'You must be logged in' })
  }
  next()
}
