import { Datastore, Query } from '@google-cloud/datastore'
import { Gstore, instances } from 'gstore-node'
import env from '../../env'
import { DatastoreKind, Entity } from '../../types'
import logger from '../logger'

const gstore = new Gstore()
const datastore = new Datastore()

export function init() {
  gstore.connect(datastore)
  instances.set(env.gstoreId, gstore)
}

export async function create<T>(kind: DatastoreKind, data: T) {
  try {
    const item = await datastore.save({
      key: datastore.key([kind]),
      data,
    })
    return item
  } catch (error) {
    logger.error(`datastore/create:${kind} `, data)
    logger.error(`datastore/create:${kind} `, error)
    throw error
  }
}

export async function update<T>(kind: DatastoreKind, id: string, data: T) {
  const item = {
    key: datastore.key([kind, id]),
    data,
  }

  try {
    const res = await datastore.update(item)
    return res
  } catch (error) {
    logger.error(`datastore/update:${kind}:${id} `, data)
    logger.error(`datastore/update:${kind}:${id} `, error)
    throw error
  }
}

export async function get<T>(
  kind: DatastoreKind,
  id: string
): Promise<Entity<T> | undefined> {
  try {
    const key = datastore.key([kind, id])
    const item = await datastore.get(key)
    return item
  } catch (error) {
    logger.error(`datastore/get:${kind}:${id} `, error)
    throw error
  }
}

export async function list<T>(
  query: Query
): Promise<Array<Entity<T> | undefined> | undefined> {
  try {
    const [items] = await datastore.runQuery(query)
    return items
  } catch (error) {
    logger.error(`datastore/list `, query)
    logger.error(`datastore/list `, error)
    throw error
  }
}

export async function remove(kind: DatastoreKind, id: string) {
  try {
    const key = datastore.key([kind, id])
    await datastore.delete(key)
    return id
  } catch (error) {
    logger.error(`datastore/remove:${kind}:${id} `, error)
    throw error
  }
}

export default {
  create,
  update,
  get,
  list,
  remove,
  query: datastore.createQuery,
}
