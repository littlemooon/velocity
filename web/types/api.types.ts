import { Timestamp } from '@google-cloud/firestore'

export namespace Api {
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

  export interface AnalyticPermissions {
    effective?: Array<
      | 'COLLABORATE'
      | 'EDIT'
      | 'MANAGE_USERS'
      | 'READ_AND_ANALYZE'
      | string
      | undefined
    >
  }

  export interface AccountProperty {
    providerId: string
    name?: string
    websiteUrl?: string
    level?: string
    profileCount?: number
    industryVertical?: string
    permissions?: AnalyticPermissions
    providerCreated?: Timestamp
    providerUpdated?: Timestamp
  }

  export interface Account {
    provider: Provider
    providerId: string
    name?: string
    permissions?: AnalyticPermissions
    providerCreated?: Timestamp
    providerUpdated?: Timestamp
    syncedAt: Timestamp
    properties: AccountProperty[]
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
}
