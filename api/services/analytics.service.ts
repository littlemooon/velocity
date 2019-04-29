import { google } from 'googleapis'
import createLogger from '../logger'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

const analyticsV3 = google.analytics('v3')

export async function getAccounts() {
  logger.info('Getting analytics accounts')
  const response = await analyticsV3.management.accounts.list()

  if (response.data.items && response.data.items.length) {
    return response.data.items.map(account => {
      return account.id ? getProperties(account.id) : undefined
    })
  } else {
    logger.error('No accounts found for this user.')
  }
}

export async function getProperties(accountId: string) {
  const response = await analyticsV3.management.webproperties.list({
    accountId,
  })

  if (response.data.items && response.data.items.length) {
    return response.data.items.map(property => {
      return property.accountId && property.id
        ? getProfiles(property.accountId, property.id)
        : undefined
    })
  } else {
    logger.error(`No properties found for this account: ${accountId}`)
  }
}

export async function getProfiles(accountId: string, propertyId: string) {
  const response = await analyticsV3.management.profiles.list({
    accountId,
    webPropertyId: propertyId,
  })

  if (response.data.items && response.data.items.length) {
    return response.data.items.map(profile => {
      return profile.id ? queryCoreReportingApi(profile.id) : undefined
    })
  } else {
    logger.error('No views (profiles) found for this user.')
  }
}

export async function queryCoreReportingApi(profileId: string) {
  const response = await analyticsV3.data.ga.get({
    ids: 'ga:' + profileId,
    'start-date': '7daysAgo',
    'end-date': 'today',
    metrics: 'ga:sessions',
  })

  return JSON.stringify(response.data, null, 2)
}
