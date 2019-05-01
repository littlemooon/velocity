import * as qs from 'query-string'
import { Route } from 'vue-router'
import { Nuxt } from '../types'

export function requiresAuth(route: Route) {
  return !route.matched.some(m => {
    return Boolean(m.path.match(/^\/(login|logout|dev)/))
  })
}

const authenticateRoute: Nuxt.Middleware = ({ store, redirect, route }) => {
  const { auth } = store.state
  const isValidRoute = Boolean(route.matched.length)

  if (isValidRoute) {
    const isLogin = route.path === '/login'

    if (auth.authenticated && isLogin) {
      redirect('/')
    } else if (!auth.authenticated && requiresAuth(route)) {
      redirect(`/login?${qs.stringify({ redirect: route.path })}`)
    }
  }
}

export default authenticateRoute
