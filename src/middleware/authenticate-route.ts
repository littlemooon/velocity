import { Middleware } from '../types'
import { startsWith } from '~/utils/string'

let authenticateRoute: Middleware = ({ store, redirect, route }) => {
  let { auth } = store.state
  let isValidRoute = Boolean(route.matched.length)

  if (isValidRoute) {
    let isLogin = route.path === '/auth/login'
    let isAuthRoute = route.matched.some(m => startsWith(m.path, '/auth'))

    if (auth.user && isLogin) {
      redirect('/')
    } else if (!auth.user && !isAuthRoute) {
      redirect('/auth/login')
    }
  }
}

export default authenticateRoute
