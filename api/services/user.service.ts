import * as Joi from '@hapi/joi'
import * as express from 'express'
import createLogger from '../logger'
import { User, Provider, Db } from '../types';
import { getSession, clearSession, setSession } from '../utils/session.util';
import Firestore from './firestore.service'
import { JoiTimestamp } from '../utils/joi.util';

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export const fs = new Firestore<User>(
  'user',
  Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    provider: Joi.string().required(),
    providerId: Joi.string().required(),
    accountIds: Joi.array().items(Joi.string()).required(),
    refreshToken: Joi.string(),
    image: Joi.string(),
    language: Joi.string(),
    name: Joi.string(),
    loginCount: Joi.number()
      .integer()
      .required(),
    loginAt: JoiTimestamp.required(),
  })
)

export const db = fs.db

export async function get(provider: Provider, providerId: string) {
  const name = `${provider}/${providerId}`

  const user = await fs.findOne(db.where('providerId', '==', providerId))
  if (!user) {
    logger.error(`No user found with id: ${name}`)
    throw new Error(`No user found with id: ${name}`)
  }

  return user
}

export async function getCurrent(req: express.Request) {
  const { user } = getSession(req)
  if (user) {
    const doc = await db.doc(user.id)
    return fs.dataFromDoc(doc)
  } else {
    logger.error('No user in session')
    throw new Error('No current user')
  }
}

export async function updateCurrent(req: express.Request, data: Partial<Db<User>>) {
  const session = getSession(req)

  if (session.user) {
    const snap = await db.doc(session.user.id).get()
    const doc = await fs.update(snap, data)

    if (doc) {
      const user = await fs.dataFromDoc(doc)
      setSession(req, {user})
      return doc
    }
  } else {
    clearSession(req)
  }
}
