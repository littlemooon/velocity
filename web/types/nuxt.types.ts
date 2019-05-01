import { Route } from 'vue-router'
import { Store } from '../store/index'
import { Api } from './api.types'

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
