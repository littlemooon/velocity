import { Timestamp } from '@google-cloud/firestore'

export enum Provider {
  GOOGLE = 'google',
}

export type Db<T extends object> = T & {
  id: string
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export interface User {
  email: string
  provider: Provider
  providerId: string
  accountIds: string[]
  refreshToken?: string
  image?: string
  language?: string
  name?: string
  loginCount: number
  loginAt: Timestamp
}

export type AnalyticPermissions =
  | 'COLLABORATE'
  | 'EDIT'
  | 'MANAGE_USERS'
  | 'READ_AND_ANALYZE'

export interface Account {
  provider: Provider
  providerId: string
  name?: string
  permissions?: {
    effective?: Array<AnalyticPermissions | string | undefined>
  }
  providerCreated?: Timestamp
  providerUpdated?: Timestamp
  syncedAt: Timestamp
}

export interface Session {
  user?: Db<User>
  redirect?: string
  tokens?: {
    refresh_token?: string | null
    expiry_date?: number | null
    access_token?: string | null
    token_type?: string | null
    id_token?: string | null
  }
}
