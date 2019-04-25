import { Datastore } from '@google-cloud/datastore'

const datastore = new Datastore()

export type DatastoreKind = 'User'

export async function create<T extends { id: string }>(
  kind: DatastoreKind,
  data: T
) {
  const item = {
    key: datastore.key([kind, data.id]),
    data,
  }

  try {
    await datastore.save(item)
    return item
  } catch (error) {
    console.error(error)
    return false
  }
}
