import env from '../../env'

const session = require('cookie-session')

const cookieSession = session({
  name: 'session',
  keys: env.cookieSessionKeys,
  cookie: {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  },
})

export default cookieSession
