import * as express from 'express'
import { Credentials } from 'google-auth-library'
import { google } from 'googleapis'
import env from '../../env'
import createLogger from '../logger'
import * as User from '../services/user.service'
import { clearSession, getSession, setSession } from './session-utils'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export const oauthClient = new google.auth.OAuth2(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUrl
)

export async function setAuthUser(req: express.Request, tokens: Credentials) {
  try {
    logger.info(`setAuthUser: Setting user ${tokens.access_token}`)
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

    const user = {
      googleId,
      email: (emails && emails.length && emails[0].value) || '',
      name: displayName,
      image: image && image.url,
      language,
      googleRefreshToken: tokens.refresh_token || undefined,
      loginAt: new Date(),
    }

    const result = await User.db.where('googleId', '==', googleId).get()

    if (result.empty) {
      await User.create({
        ...user,
        loginCount: 1,
        loginAt: new Date(),
        createdAt: new Date(),
      })
    } else if (result.size > 1) {
      throw new Error(`more than one user found with googleId: ${googleId}`)
    } else {
      const snap = result.docs[0]
      await User.update(snap, {
        ...user,
        loginCount: snap.data().loginCount + 1,
      })
    }

    setSession(req, { user })
  } catch (error) {
    clearAuthUser(req)
    throw error
  }
}

export function clearAuthUser(req: express.Request) {
  const session = getSession(req)

  if (session.user) {
    logger.info('clearAuthUser: Clearing auth user', session.user)
    oauthClient.revokeCredentials()
    clearSession(req)
  }
}
