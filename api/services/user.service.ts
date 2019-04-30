import { QueryDocumentSnapshot, Timestamp } from '@google-cloud/firestore'
import Joi, { ValidationResult } from '@hapi/joi'
import createLogger from '../logger'
import firestore from '../services/firestore'

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export const db = firestore.collection('user')

export interface IUser {
  email: string
  googleId: string
  googleRefreshToken?: string
  image?: string
  language?: string
  name?: string
  loginCount: number
  loginAt: Timestamp
  createdAt: Timestamp
}

const JoiTimestamp = Joi.object({
  _seconds: Joi.number(),
  _nanoseconds: Joi.number(),
})

const schema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  googleId: Joi.string().required(),
  googleRefreshToken: Joi.string(),
  image: Joi.string(),
  language: Joi.string(),
  name: Joi.string(),
  loginCount: Joi.number()
    .integer()
    .required(),
  loginAt: JoiTimestamp.required(),
  createdAt: JoiTimestamp.required(),
})

export function validate(user: IUser): ValidationResult<IUser> {
  return Joi.validate(user, schema)
}

export async function create(user: IUser) {
  logger.info('Creating user', user)
  user = await validate(user)
  return db.add(user)
}

export async function update(
  snap: QueryDocumentSnapshot,
  user: Partial<IUser>
) {
  const prev = snap.data() as IUser
  logger.info(`Updating user: ${snap.id}`, { prev, next: user })
  user = await validate({ ...prev, ...user })
  return snap.ref.update(user)
}
