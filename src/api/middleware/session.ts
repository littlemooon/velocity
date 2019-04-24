import session from 'express-session'

const MemStore = require('connect-memjs')(session)

function getStore() {
  if (process.env.USE_GAE_MEMCACHE) {
    return new MemStore({
      servers: [
        `${process.env.GAE_MEMCACHE_HOST}:${process.env.GAE_MEMCACHE_PORT}`,
      ],
    })
  }
}

const expressSession = session({
  store: getStore(),
  name: 'session-id',
  secret: process.env.SESSION_SECRET || 'x',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
  },
  saveUninitialized: false,
  resave: true,
})

export default expressSession
