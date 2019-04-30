import * as express from 'express'
import { google } from 'googleapis'
import createLogger from '../logger'
import { getOauthClient } from '../utils/auth.util'
import { getSession } from '../utils/session.util'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

function getAnalyticsV3(req: express.Request) {
  return google.analytics({
    version: 'v3',
    auth: getOauthClient(req),
  })
}

export async function getAccounts(req: express.Request) {
  logger.info('Getting analytics accounts')
  console.log(
    '-------------------- analytics.service --> session',
    getSession(req)
  )
  console.log('-------------------- analytics.service --> cookies', req.cookies)
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

export const a = {
  data: [
    [
      [
        {
          kind: 'analytics#gaData',
          id:
            'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:79429586&metrics=ga:sessions&start-date=7daysAgo&end-date=today',
          query: {
            'start-date': '7daysAgo',
            'end-date': 'today',
            ids: 'ga:79429586',
            metrics: ['ga:sessions'],
            'start-index': 1,
            'max-results': 1000,
          },
          itemsPerPage: 1000,
          totalResults: 0,
          selfLink:
            'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:79429586&metrics=ga:sessions&start-date=7daysAgo&end-date=today',
          profileInfo: {
            profileId: '79429586',
            accountId: '45993573',
            webPropertyId: 'UA-45993573-1',
            internalWebPropertyId: '76831565',
            profileName: 'All Web Site Data',
            tableId: 'ga:79429586',
          },
          containsSampledData: false,
          columnHeaders: [
            { name: 'ga:sessions', columnType: 'METRIC', dataType: 'INTEGER' },
          ],
          totalsForAllResults: { 'ga:sessions': '0' },
        },
      ],
    ],
    [
      [
        {
          response: {
            config: {
              url:
                'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A90822334&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
              method: 'GET',
              headers: {
                'Accept-Encoding': 'gzip',
                'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
                Authorization:
                  'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
                Accept: 'application/json',
              },
              params: {
                ids: 'ga:90822334',
                'start-date': '7daysAgo',
                'end-date': 'today',
                metrics: 'ga:sessions',
              },
              responseType: 'json',
            },
            data: {
              error: {
                errors: [
                  {
                    domain: 'global',
                    reason: 'insufficientPermissions',
                    message:
                      'User does not have sufficient permissions for this profile.',
                  },
                ],
                code: 403,
                message:
                  'User does not have sufficient permissions for this profile.',
              },
            },
            headers: {
              'alt-svc': 'quic=":443"; ma=2592000; v="46,44,43,39"',
              'cache-control': 'private, max-age=0',
              connection: 'close',
              'content-encoding': 'gzip',
              'content-type': 'application/json; charset=UTF-8',
              date: 'Mon, 29 Apr 2019 14:51:15 GMT',
              expires: 'Mon, 29 Apr 2019 14:51:15 GMT',
              server: 'GSE',
              'transfer-encoding': 'chunked',
              vary: 'Origin, X-Origin',
              'www-authenticate':
                'Bearer realm="https://accounts.google.com/", error=insufficient_scope, scope="https://www.googleapis.com/auth/analytics"',
              'x-content-type-options': 'nosniff',
              'x-frame-options': 'SAMEORIGIN',
              'x-xss-protection': '1; mode=block',
            },
            status: 403,
            statusText: 'Forbidden',
          },
          config: {
            url:
              'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A90822334&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
            method: 'GET',
            headers: {
              'Accept-Encoding': 'gzip',
              'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
              Authorization:
                'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
              Accept: 'application/json',
            },
            params: {
              ids: 'ga:90822334',
              'start-date': '7daysAgo',
              'end-date': 'today',
              metrics: 'ga:sessions',
            },
            responseType: 'json',
          },
          code: 403,
          errors: [
            {
              domain: 'global',
              reason: 'insufficientPermissions',
              message:
                'User does not have sufficient permissions for this profile.',
            },
          ],
        },
        {
          response: {
            config: {
              url:
                'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A92320289&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
              method: 'GET',
              headers: {
                'Accept-Encoding': 'gzip',
                'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
                Authorization:
                  'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
                Accept: 'application/json',
              },
              params: {
                ids: 'ga:92320289',
                'start-date': '7daysAgo',
                'end-date': 'today',
                metrics: 'ga:sessions',
              },
              responseType: 'json',
            },
            data: {
              error: {
                errors: [
                  {
                    domain: 'global',
                    reason: 'insufficientPermissions',
                    message:
                      'User does not have sufficient permissions for this profile.',
                  },
                ],
                code: 403,
                message:
                  'User does not have sufficient permissions for this profile.',
              },
            },
            headers: {
              'alt-svc': 'quic=":443"; ma=2592000; v="46,44,43,39"',
              'cache-control': 'private, max-age=0',
              connection: 'close',
              'content-encoding': 'gzip',
              'content-type': 'application/json; charset=UTF-8',
              date: 'Mon, 29 Apr 2019 14:51:15 GMT',
              expires: 'Mon, 29 Apr 2019 14:51:15 GMT',
              server: 'GSE',
              'transfer-encoding': 'chunked',
              vary: 'Origin, X-Origin',
              'www-authenticate':
                'Bearer realm="https://accounts.google.com/", error=insufficient_scope, scope="https://www.googleapis.com/auth/analytics"',
              'x-content-type-options': 'nosniff',
              'x-frame-options': 'SAMEORIGIN',
              'x-xss-protection': '1; mode=block',
            },
            status: 403,
            statusText: 'Forbidden',
          },
          config: {
            url:
              'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A92320289&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
            method: 'GET',
            headers: {
              'Accept-Encoding': 'gzip',
              'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
              Authorization:
                'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
              Accept: 'application/json',
            },
            params: {
              ids: 'ga:92320289',
              'start-date': '7daysAgo',
              'end-date': 'today',
              metrics: 'ga:sessions',
            },
            responseType: 'json',
          },
          code: 403,
          errors: [
            {
              domain: 'global',
              reason: 'insufficientPermissions',
              message:
                'User does not have sufficient permissions for this profile.',
            },
          ],
        },
        {
          response: {
            config: {
              url:
                'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A92324711&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
              method: 'GET',
              headers: {
                'Accept-Encoding': 'gzip',
                'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
                Authorization:
                  'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
                Accept: 'application/json',
              },
              params: {
                ids: 'ga:92324711',
                'start-date': '7daysAgo',
                'end-date': 'today',
                metrics: 'ga:sessions',
              },
              responseType: 'json',
            },
            data: {
              error: {
                errors: [
                  {
                    domain: 'global',
                    reason: 'insufficientPermissions',
                    message:
                      'User does not have sufficient permissions for this profile.',
                  },
                ],
                code: 403,
                message:
                  'User does not have sufficient permissions for this profile.',
              },
            },
            headers: {
              'alt-svc': 'quic=":443"; ma=2592000; v="46,44,43,39"',
              'cache-control': 'private, max-age=0',
              connection: 'close',
              'content-encoding': 'gzip',
              'content-type': 'application/json; charset=UTF-8',
              date: 'Mon, 29 Apr 2019 14:51:15 GMT',
              expires: 'Mon, 29 Apr 2019 14:51:15 GMT',
              server: 'GSE',
              'transfer-encoding': 'chunked',
              vary: 'Origin, X-Origin',
              'www-authenticate':
                'Bearer realm="https://accounts.google.com/", error=insufficient_scope, scope="https://www.googleapis.com/auth/analytics"',
              'x-content-type-options': 'nosniff',
              'x-frame-options': 'SAMEORIGIN',
              'x-xss-protection': '1; mode=block',
            },
            status: 403,
            statusText: 'Forbidden',
          },
          config: {
            url:
              'https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A92324711&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions',
            method: 'GET',
            headers: {
              'Accept-Encoding': 'gzip',
              'User-Agent': 'google-api-nodejs-client/0.7.2 (gzip)',
              Authorization:
                'Bearer ya29.Glv6BoE8OJcQWPbi7WpYS0JfTnNVCux8IvIMMaaw1dGl8kicjnzeR-2kydPGgUv_BB2v0T6KNUjbgx0ofIjl5hytQBNUnv_R5J5bfKlmJAlj1RJsU4RE4iqHCp5l',
              Accept: 'application/json',
            },
            params: {
              ids: 'ga:92324711',
              'start-date': '7daysAgo',
              'end-date': 'today',
              metrics: 'ga:sessions',
            },
            responseType: 'json',
          },
          code: 403,
          errors: [
            {
              domain: 'global',
              reason: 'insufficientPermissions',
              message:
                'User does not have sufficient permissions for this profile.',
            },
          ],
        },
      ],
    ],
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    connection: 'keep-alive',
    'content-length': '7236',
    'content-type': 'application/json; charset=utf-8',
    date: 'Mon, 29 Apr 2019 14:51:15 GMT',
    etag: 'W/"1c44-2ltOQqhdS/GhgA2l7RQw4iKDxmA"',
    'strict-transport-security': 'max-age=15552000; includeSubDomains',
    'x-content-type-options': 'nosniff',
    'x-dns-prefetch-control': 'off',
    'x-download-options': 'noopen',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block',
  },
  config: {
    transformRequest: {},
    transformResponse: {},
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    headers: { Accept: 'application/json, text/plain, */*' },
    method: 'get',
    url: '/api/analytics/accounts',
  },
  request: {},
}
