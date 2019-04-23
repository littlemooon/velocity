import { Route } from 'vue-router'
import { Store } from './store/index'

export interface IContext {
  store: Store
  redirect: (p: string) => void
  route: Route
}

export type Plugin = (c: IContext) => void | Promise<void>

export type Middleware = (c: IContext) => void
