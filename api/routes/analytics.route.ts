import * as express from 'express'
import createLogger from '../logger'
import * as Analytics from '../services/analytics.service'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

const router = express.Router()

router.get('/account', async (req, res) => {
  try {
    const result = await Analytics.getAccounts(req)
    return res.status(200).send(result)
  } catch (e) {
    logger.error('Error when getting analytic accounts', e)
    return res.status(500).send({
      status: 'unable_to_get_analytic_accounts',
      message: e.message,
    })
  }
})

router.get('/account/:accountId', async (req, res) => {
  const { accountId } = req.params
  try {
    const result = await Analytics.getProperties(req, accountId)
    return res.status(200).send(result)
  } catch (e) {
    logger.error(`Error when getting analytic properties: ${accountId}`, e)
    return res.status(500).send({
      status: 'unable_to_get_analytic_properties',
      message: e.message,
    })
  }
})

router.get('/account/:accountId/property/:propertyId', async (req, res) => {
  const { accountId, propertyId } = req.params
  try {
    const result = await Analytics.getProfiles(req, accountId, propertyId)
    return res.status(200).send(result)
  } catch (e) {
    logger.error(
      `Error when getting analytic profiles: ${accountId}/${propertyId}`,
      e
    )
    return res.status(500).send({
      status: 'unable_to_get_analytic_profiles',
      message: e.message,
    })
  }
})

router.get('/:profileId/sessions', async (req, res) => {
  const { profileId } = req.params
  try {
    const result = await Analytics.getSessions(req, profileId)
    return res.status(200).send(result)
  } catch (e) {
    logger.error(`Error when getting profile sessions: ${profileId}`, e)
    return res.status(500).send({
      status: 'unable_to_get_analytic_sessions',
      message: e.message,
    })
  }
})

export default router

export const a = {
  data: [
    {
      id: '45993573',
      kind: 'analytics#account',
      selfLink:
        'https://www.googleapis.com/analytics/v3/management/accounts/45993573',
      name: 'Bertie Wright',
      permissions: {
        effective: ['COLLABORATE', 'EDIT', 'MANAGE_USERS', 'READ_AND_ANALYZE'],
      },
      created: '2013-11-24T23:55:01.654Z',
      updated: '2015-08-11T20:38:03.750Z',
      childLink: {
        type: 'analytics#webproperties',
        href:
          'https://www.googleapis.com/analytics/v3/management/accounts/45993573/webproperties',
      },
    },
    {
      id: '54516992',
      kind: 'analytics#account',
      selfLink:
        'https://www.googleapis.com/analytics/v3/management/accounts/54516992',
      name: 'Demo Account',
      permissions: { effective: ['READ_AND_ANALYZE'] },
      created: '2014-09-06T17:53:33.397Z',
      updated: '2018-02-11T23:40:54.514Z',
      childLink: {
        type: 'analytics#webproperties',
        href:
          'https://www.googleapis.com/analytics/v3/management/accounts/54516992/webproperties',
      },
    },
  ],
  status: 200,
  statusText: 'OK',
  headers: {
    connection: 'keep-alive',
    'content-length': '860',
    'content-type': 'application/json; charset=utf-8',
    date: 'Mon, 29 Apr 2019 15:01:43 GMT',
    etag: 'W/"35c-aNv18SoU3IDJps48Z1dhswG4+eQ"',
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
    url: '/api/analytics/account',
  },
  request: {},
}
