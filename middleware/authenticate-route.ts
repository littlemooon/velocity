import * as qs from 'query-string'
import { Middleware } from '../types'
import { startsWith } from '../utils/string'

const authenticateRoute: Middleware = ({ store, redirect, route }) => {
  const { auth } = store.state
  const isValidRoute = Boolean(route.matched.length)

  if (isValidRoute) {
    const isLogin = route.path === '/auth/login'
    const isAuthRoute = route.matched.some(m => startsWith(m.path, '/auth'))

    if (auth.user && isLogin) {
      redirect('/')
    } else if (!auth.user && !isAuthRoute) {
      redirect(`/auth/login?${qs.stringify({ redirect: route.path })}`)
    }
  }
}

export default authenticateRoute
