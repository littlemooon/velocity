import { Credentials } from 'google-auth-library'
import { Route } from 'vue-router'
import { Store } from './store/index'

export interface IContext {
  store: Store
  redirect: (p: string) => void
  route: Route
}

export type Plugin = (c: IContext) => void | Promise<void>

export type Middleware = (c: IContext) => void

export enum DatastoreKind {
  'USER' = 'User',
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export enum DeviceType {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export interface IUser {
  email?: string
  googleId?: string
  image?: string
  language?: string
  name?: string
  refreshToken?: string | null
  lastLogin?: number
}

export interface ISession {
  user?: IUser
  redirect?: string
  tokens?: Credentials
}

export interface ICookies {
  token?: string
}

export type Entity<T> = T & { key: () => string }

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
  error?: FetchError
  state: FetchState
  data: T
}
