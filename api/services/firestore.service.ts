import {
  CollectionReference,
  DocumentReference,
  Firestore as GFirestore,
  Query,
  DocumentSnapshot,
  Timestamp,
} from '@google-cloud/firestore'
import * as Joi from '@hapi/joi'
import createLogger from '../logger'
import { Db } from '../types'
import { JoiTimestamp } from '../utils/joi.util';

const firestore = new GFirestore()

const logger = createLogger(__filename.replace(process.env.PWD || '', ''))

export type FirestoreKey = 'user' | 'account'

export default class Firestore<T extends object> {
  public key: FirestoreKey
  public db: CollectionReference
  public schema: Joi.ObjectSchema

  constructor(key: FirestoreKey, schema: Joi.ObjectSchema) {
    this.key = key
    this.db = firestore.collection(key)
    this.schema = schema
  }

  public async dataFromDoc(ref: DocumentReference): Promise<Db<T>> {
    const snap = await ref.get()
    return this.data(snap)
  }

  public async data(snap: DocumentSnapshot): Promise<Db<T>> {
    const data = (await snap.data()) as Db<T>
    return { id: snap.id, ...data }
  }

  public async validate(data: T) {
    try {
      return Joi.validate(data, this.schema.append({
        createdAt: JoiTimestamp.required(),
        updatedAt: JoiTimestamp,
      }))
    } catch (error) {
      logger.error(`Failed to validate ${this.key}`, error)
      throw new Error(error)
    }
  }

  public async create(data: T) {
    try {
      logger.info(`Creating ${this.key}`, data)
      data = { ...data, createdAt: Timestamp.now() }
      data = await this.validate(data)
      const result = await this.db.add(data)
      return result
    } catch (error) {
      logger.error(`Failed to create ${this.key}`, error)
    }
  }

  public async update(snap: DocumentSnapshot, data: Partial<Db<T>>) {
    try {
      if (snap.exists) {
        const prev = await this.data(snap)

        logger.info(`Updating ${this.key}: ${snap.id}`, { prev, next: data })
        data = { ...data, updatedAt: Timestamp.now() }
        delete prev.id
        data = await this.validate({ ...prev, ...data })

        await snap.ref.update(data)
        const result = await this.db.doc(snap.id)
        return result
      } else {
        throw new Error('Cannot update snap that doesnt exist')
      }
    } catch (error) {
      logger.error(`Failed to update ${this.key}`, error)
    }
  }

  public async findOne(query: Query) {
    const result = await query.get()

    if (result.empty) {
      return
    } else if (result.size > 1) {
      throw new Error(`More than one ${this.key} found`)
    } else {
      return result.docs[0]
    }
  }

  public async createOrUpdate(
    query: Query,
    createData: T,
    createUpdateData?: (t: Db<T>) => Partial<Db<T>>
  ) {
    const snap = await this.findOne(query)

    if (snap) {
      const prev = await this.data(snap)
      const next = createUpdateData ? createUpdateData(prev) : createData

      return this.update(snap, next)
    } else {
      return this.create(createData)
    }
  }
}
