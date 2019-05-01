import * as Joi from '@hapi/joi'
import * as express from 'express'
import createLogger from '../logger'
import { Account } from '../types'
import Firestore from './firestore.service'
import { JoiTimestamp } from '../utils/joi.util';
import { getSession } from '../utils/session.util';

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export const fs = new Firestore<Account>(
  'account',
  Joi.object().keys({
    provider: Joi.string(),
    providerId: Joi.string(),
    name: Joi.string(),
    permissions: Joi.object({
      effective: Joi.array().items(Joi.string()),
    }),
    providerCreated: JoiTimestamp,
    providerUpdated: JoiTimestamp,
    syncedAt: JoiTimestamp.required(),
  })
)

export const db = fs.db

export async function getCurrent(req: express.Request) {
  const { user } = getSession(req)

  if (user) {
    const accounts = await Promise.all(
      user.accountIds.map(async accountId => {
        const result = await db.doc(accountId)
        return fs.dataFromDoc(result)
      })
    )

    logger.info(`Found ${accounts.length} accounts for user`)
    return accounts
  } else {
    throw new Error('No user in session')
  }
}
