import * as express from 'express'
import { google } from 'googleapis'
import createLogger from '../logger'
import { getOauthClient } from '../utils/auth.util'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

function getAnalyticsV3(req: express.Request) {
  return google.analytics({
    version: 'v3',
    auth: getOauthClient(req),
  })
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
