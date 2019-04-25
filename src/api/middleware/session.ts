import { Datastore } from '@google-cloud/datastore'
import session from 'express-session'

const DatastoreStore = require('@google-cloud/connect-datastore')(session)

const expressSession = session({
  store: new DatastoreStore({
    dataset: new Datastore({
      namespace: 'express-sessions',
    }),
  }),
  name: 'session-id',
  secret: process.env.SESSION_SECRET || 'x',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52,
  },
  saveUninitialized: false,
  resave: true,
})

export default expressSession
