import { Route } from 'vue-router'
import { Store } from '../store/index'
import { Api } from './api'

export * from './api'

export namespace Fetch {
  export enum State {
    INIT = 'INIT',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }

  export type Error =
    | { status?: number; statusText: string; message?: string }

  export interface Result<T> {
    state: State
    error?: Error
    data?: T
  }
}

export namespace Nuxt {
  export interface Context {
    store: Store
    redirect: (p: string) => void
    route: Route
    req?: {
      session?: Api.Session
      cookies: object
    }
  }

  export type Plugin = (c: Context) => void | Promise<void>

  export type Middleware = (c: Context) => void
}
