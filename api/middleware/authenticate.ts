import { setAuthUser } from 'api/utils/auth-utils'
import * as express from 'express'
import logger from '../logger'
import { oauthClient } from '../utils/auth-utils'
import { getSession } from '../utils/session-utils'

export async function validateQueryToken(
  req: express.Request,
  res: express.Response
) {
  const queryToken = req.query.token

  if (queryToken) {
    try {
      logger.info('authenticate: verifying query token', queryToken)

      const info = await oauthClient.getTokenInfo(queryToken)
      if (info.user_id) {
        logger.info('authenticate: found user for query token', info)

        await setAuthUser(req, { access_token: queryToken })
      } else {
        logger.warn('authenticate: failed to validate query token', {
          queryToken,
          info,
        })
        return res
          .status(401)
          .send({ status: 'auth_required', message: 'You must be logged in' })
      }
    } catch (e) {
      logger.error('authenticate: error when validating query token', e)
      return res.status(500).send({
        status: 'unable_to_verify_token',
        message: e.message,
      })
    }
  }
}

export async function requireAuth(req: express.Request, res: express.Response) {
  const isAuthed = getSession(req).tokens

  if (!isAuthed) {
    return res
      .status(401)
      .send({ status: 'auth_required', message: 'You must be logged in' })
  }
}
