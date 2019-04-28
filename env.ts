import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`

export default {
  dev: process.env.NODE_ENV !== 'production',

  appName: process.env.APP_NAME || 'unvanity',
  baseUrl,

  authScopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive.file',
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
