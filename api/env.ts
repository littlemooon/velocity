import * as dotenv from 'dotenv'

const dev = process.env.NODE_ENV !== 'production'

dotenv.config({ path: '.env' })
dotenv.config({ path: dev ? '.env.dev' : '.env.prod' })

const port = process.env.PORT || 3333
const apiUrl = process.env.API_URL || `http://localhost:${port}`
const webUrl = process.env.WEB_URL || 'http://localhost:8888'

export default {
  dev,
  port,
  apiUrl,
  webUrl,

  appName: process.env.APP_NAME || 'unvanity',

  authScopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    // 'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics',
  ],

  cookieSessionKeys: [
    process.env.COOKIE_SESSION_KEY1,
    process.env.COOKIE_SESSION_KEY2,
  ],

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUrl: [apiUrl, process.env.GOOGLE_REDIRECT_URL].join(''),

  gstoreId: process.env.GSTORE_INSTANCE_ID || 'x',
}
