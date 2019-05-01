import { Timestamp } from '@google-cloud/firestore'
import * as express from 'express'
import { google } from 'googleapis'
import createLogger from '../logger'
import { Provider } from '../types'
import { getOauthClient } from '../utils/auth.util'
import * as Account from './account.service'
import * as User from './user.service'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

function getAnalyticsV3(req: express.Request) {
  return google.analytics({
    version: 'v3',
    auth: getOauthClient(req),
  })
}

function timestampFromString(s?: string): Timestamp | undefined {
  return s ? Timestamp.fromMillis(parseInt(s, 10)) : undefined
}

export async function sync(
  req: express.Request,
  provider: Provider,
  providerId: string
) {
  try {
    logger.info('Syncing analytics accounts')
    const analyticsV3 = getAnalyticsV3(req)

    const response = await analyticsV3.management.accounts.list()
    const accounts = response.data.items

    if (accounts) {
      const results = await Promise.all(
        accounts.map(account => {
          return Account.fs.createOrUpdate(
            Account.db
              .where('provider', '==', Provider.GOOGLE)
              .where('providerId', '==', account.id),
            {
              provider: Provider.GOOGLE,
              providerId: account.id || 'xxx',
              name: account.name,
              permissions: account.permissions,
              providerCreated: timestampFromString(account.created),
              providerUpdated: timestampFromString(account.updated),
              syncedAt: Timestamp.now(),
            }
          )
        })
      )

      const accountIds = results.reduce((acc: string[], result) => {
        return result ? [...acc, result.id] : acc
      }, [])

      if (accountIds.length) {
        const snap = await User.get(provider, providerId)
        const doc = await User.fs.update(snap, { accountIds })
        return doc && (await User.fs.dataFromDoc(doc))
      }
    } else {
      logger.warn('No analytic accounts to update')
    }
  } catch (error) {
    logger.error('Error syncing google accounts', error)
    throw error
  }
}

export async function syncProperties(req: express.Request, accountId: string) {
  logger.info(`Syncing analytics properties for account: ${accountId}`)
  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.management.webproperties.list({
    accountId,
  })

  const properties = response.data.items

  if (properties) {
    // create properties
  } else {
    logger.warn(`No analytic properties to update for account: ${accountId}`)
  }
}

export async function syncProfiles(
  req: express.Request,
  accountId: string,
  propertyId: string
) {
  const name = `${accountId}/${propertyId}`
  logger.info(`Syncing analytics profiles for property: ${name}`)
  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.management.profiles.list({
    accountId,
    webPropertyId: propertyId,
  })

  const profiles = response.data.items

  if (profiles) {
    // create profiles
  } else {
    logger.warn(`No analytic profiles to update for property: ${name}`)
  }
}
