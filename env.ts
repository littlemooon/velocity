import dotenv from 'dotenv'

const dev = process.env.NODE_ENV !== 'production'

dotenv.config({ path: '.env' })
dotenv.config({ path: dev ? '.env.dev' : '.env.prod' })

const PORT = process.env.PORT || 3000

const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`

export default {
  dev,

  appName: process.env.APP_NAME || 'unvanity',
  baseUrl,

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
  googleRedirectUrl: [baseUrl, process.env.GOOGLE_REDIRECT_URL].join(''),

  gstoreId: process.env.GSTORE_INSTANCE_ID || 'x',
}
