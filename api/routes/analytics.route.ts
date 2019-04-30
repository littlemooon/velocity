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
