import { Route } from 'vue-router'
import { Store } from './store/index'

export interface IContext {
  store: Store
  redirect: (p: string) => void
  route: Route
}

export type Plugin = (c: IContext) => void | Promise<void>

export type Middleware = (c: IContext) => void

export interface IUser {
  email?: string
  googleId?: string
  image?: string
  language?: string
  name?: string
  lastLogin?: number
}

export interface ISession {
  user?: IUser
  redirect?: string
  tokens?: {
    refresh_token?: string | null
    expiry_date?: number | null
    access_token?: string | null
    token_type?: string | null
    id_token?: string | null
  }
}

export enum FetchState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type FetchError =
  | { status: number; statusText: string; message?: string }
  | Error

export interface IFetchResult<T> {
  state: FetchState
  error?: FetchError
  data?: T
}
