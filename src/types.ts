import { Store } from './store/index'
import { Route } from 'vue-router'

export interface Context {
  store: Store
  redirect: (p: string) => void
  route: Route
}

export type Plugin = (c: Context) => void | Promise<void>

export type Middleware = (c: Context) => void
