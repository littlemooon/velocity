import * as express from 'express'
import { Credentials } from 'google-auth-library'
import { google } from 'googleapis'
import env from '../../env'
import logger from '../logger'
import User from '../models/user.model'
import { clearSession, getSession, setSession } from './session-utils'

export const oauthClient = new google.auth.OAuth2(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUrl
)

export async function setAuthUser(req: express.Request, tokens: Credentials) {
  logger.info('setAuthUser: Setting user', tokens.access_token)
  oauthClient.setCredentials(tokens)

  const plus = google.plus({
    version: 'v1',
    auth: oauthClient,
  })
  const me = await plus.people.get({ userId: 'me' })

  if (!me.data) {
    throw new Error('No data from google plus')
  }

  const { emails, id: googleId, displayName, image, language } = me.data

  if (!googleId) {
    throw new Error('No id from google plus')
  }

  const user = new User({
    googleId,
    email: (emails && emails.length && emails[0].value) || '',
    name: displayName,
    image: image && image.url,
    language,
    googleRefreshToken: tokens.refresh_token || undefined,
    lastLogin: Date.now(),
  })

  try {
    const result = await User.findOne({ googleId })
    const existingId = result && result.entityKey && result.entityKey.id

    logger.info('Updating existing user', existingId)

    // await User.update(existingId, user)
  } catch (error) {
    if (error.code === 'ERR_ENTITY_NOT_FOUND') {
      logger.info('Creating new user', user.plain())
      await user.save()
    } else {
      throw error
    }
  }

  setSession(req, { user: user.plain() })
}

export function clearAuthUser(req: express.Request) {
  const session = getSession(req)

  if (session.user) {
    logger.info('clearAuthUser: Clearing auth user', session.user)
    oauthClient.revokeCredentials()
    clearSession(req)
  }
}
