import { Timestamp } from '@google-cloud/firestore'
import * as express from 'express'
import { google } from 'googleapis'
import createLogger from '../logger'
import { AccountProfile, AccountProperty, Provider } from '../types'
import { getOauthClient } from '../utils/auth.util'
import { filterArray, filterObj } from '../utils/filter.util'
import { getSession } from '../utils/session.util'
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

export async function sync(req: express.Request) {
  try {
    logger.info('Syncing analytics accounts')
    const accounts = await getAccounts(req)

    if (accounts) {
      const results = await Promise.all(
        accounts.map(async account => {
          if (account.id) {
            const rawProperties = await getProperties(req, account.id)
            const properties = await Promise.all(
              rawProperties.map(
                async (property): Promise<AccountProperty | undefined> => {
                  if (account.id && property.id) {
                    const rawProfiles = await getProfiles(
                      req,
                      account.id,
                      property.id
                    )

                    const profiles = rawProfiles.map(
                      (p): AccountProfile | undefined => {
                        return p.id
                          ? filterObj({
                              providerId: p.id,
                              name: p.name,
                              providerCreated: timestampFromString(p.created),
                              providerUpdated: timestampFromString(p.updated),
                              currency: p.currency,
                              timezone: p.timezone,
                              websiteUrl: p.websiteUrl,
                              type: p.type,
                              permissions: p.permissions,
                              eCommerceTracking: p.eCommerceTracking,
                              enhancedECommerceTracking:
                                p.enhancedECommerceTracking,
                              botFilteringEnabled: p.botFilteringEnabled,
                            })
                          : undefined
                      }
                    )

                    return property.id
                      ? filterObj({
                          providerId: property.id,
                          name: property.name,
                          websiteUrl: property.websiteUrl,
                          level: property.level,
                          profileCount: property.profileCount,
                          industryVertical: property.industryVertical,
                          permissions: property.permissions,
                          providerCreated: timestampFromString(
                            property.created
                          ),
                          providerUpdated: timestampFromString(
                            property.updated
                          ),
                          profiles: filterArray(profiles),
                        })
                      : undefined
                  }
                }
              )
            )

            return Account.fs.createOrUpdate(
              Account.db
                .where('provider', '==', Provider.GOOGLE)
                .where('providerId', '==', account.id),
              {
                provider: Provider.GOOGLE,
                providerId: account.id,
                name: account.name,
                permissions: account.permissions,
                providerCreated: timestampFromString(account.created),
                providerUpdated: timestampFromString(account.updated),
                syncedAt: Timestamp.now(),
                properties: filterArray(properties),
              }
            )
          }
        })
      )

      const accountIds = results.reduce((acc: string[], result) => {
        return result ? [...acc, result.id] : acc
      }, [])

      const { user } = getSession(req)
      if (user && accountIds.length) {
        const snap = await User.db.doc(user.id).get()
        const doc = await User.fs.update(snap, { accountIds })
        return doc && User.fs.dataFromDoc(doc)
      }
    } else {
      logger.warn('No analytic accounts to update')
    }
  } catch (error) {
    logger.error('Error syncing google accounts', error)
    throw error
  }
}

export async function getAccounts(req: express.Request) {
  logger.info('Getting analytics accounts')
  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.management.accounts.list()

  return response.data.items || []
}

export async function getProperties(req: express.Request, accountId: string) {
  logger.info(`Getting analytics properties for account: ${accountId}`)
  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.management.webproperties.list({
    accountId,
  })

  return response.data.items || []
}

export async function getProfiles(
  req: express.Request,
  accountId: string,
  propertyId: string
) {
  logger.info(
    `Getting analytics profiles for property: ${accountId}/${propertyId}`
  )
  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.management.profiles.list({
    accountId,
    webPropertyId: propertyId,
  })

  return response.data.items || []
}

export async function getSessions(req: express.Request, profileId: string) {
  logger.info(`Getting analytics data for profile: ${profileId}`)

  const analyticsV3 = getAnalyticsV3(req)
  const response = await analyticsV3.data.ga.get({
    ids: 'ga:' + profileId,
    'start-date': '7daysAgo',
    'end-date': 'today',
    metrics: 'ga:sessions',
  })

  return response.data
}
