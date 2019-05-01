import { Timestamp } from '@google-cloud/firestore'
import * as express from 'express'
import { Credentials } from 'google-auth-library'
import { google } from 'googleapis'
import env from '../env'
import createLogger from '../logger'
import * as AccountSync from '../services/account.sync.service'
import * as User from '../services/user.service'
import { Provider } from '../types'
import { clearSession, getSession, setSession } from './session.util'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export const oauthClient = new google.auth.OAuth2(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUrl
)

export function getOauthClient(
  req: express.Request,
  maybeTokens?: Credentials
) {
  const tokens = getSession(req).tokens || maybeTokens

  if (tokens) {
    oauthClient.setCredentials(tokens)
  } else {
    oauthClient.revokeCredentials()
  }
  return oauthClient
}

export async function setAuthUser(req: express.Request, tokens: Credentials) {
  try {
    logger.info(`Setting user ${tokens.access_token}`)

    const plus = google.plus({
      version: 'v1',
      auth: getOauthClient(req, tokens),
    })
    const me = await plus.people.get({ userId: 'me' })

    if (!me.data) {
      throw new Error('No data from google plus')
    }

    const { emails, id: googleId, displayName, image, language } = me.data

    if (!googleId) {
      throw new Error('No id from google plus')
    }

    const newUser = {
      provider: Provider.GOOGLE,
      providerId: googleId,
      accountIds: [],
      email: (emails && emails.length && emails[0].value) || '',
      name: displayName,
      image: image && image.url,
      language,
      refreshToken: tokens.refresh_token || undefined,
    }

    const doc = await User.fs.createOrUpdate(
      User.db.where('providerId', '==', googleId),
      {
        ...newUser,
        loginCount: 1,
        loginAt: Timestamp.now(),
      },
      existing => ({
        ...newUser,
        loginCount: existing.loginCount + 1,
        loginAt: Timestamp.now(),
      })
    )

    if (!doc) {
      throw new Error('Failed to create account')
    }

    const user = await User.fs.dataFromDoc(doc)

    if (!user) {
      throw new Error('No user data')
    }

    setSession(req, { user, tokens })

    const updatedUser = await AccountSync.sync(
      req,
      user.provider,
      user.providerId
    )

    if (updatedUser) {
      setSession(req, { user: updatedUser })
    } else {
      throw new Error('Failed to sync accounts')
    }
  } catch (error) {
    clearAuthUser(req)
    logger.error('Error setting auth user', error)
    throw error
  }
}

export function clearAuthUser(req: express.Request) {
  const session = getSession(req)

  if (session.user) {
    logger.info('Clearing auth user', session.user)
    try {
      oauthClient.revokeCredentials()
    } catch (e) {
      logger.error('Error clearing auth user', e)
    }
    clearSession(req)
  }
}
