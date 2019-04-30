import * as qs from 'query-string'
import { Middleware } from '../types'

const authenticateRoute: Middleware = ({ store, redirect, route }) => {
  const { auth } = store.state
  const isValidRoute = Boolean(route.matched.length)

  if (isValidRoute) {
    const isLogin = route.path === '/auth/login'
    const requiresAuth = !route.matched.some(m =>
      Boolean(m.path.match(/^\/(auth|dev)\//))
    )

    if (auth.authenticated && isLogin) {
      redirect('/')
    } else if (!auth.authenticated && requiresAuth) {
      redirect(`/auth/login?${qs.stringify({ redirect: route.path })}`)
    }
  }
}

export default authenticateRoute
