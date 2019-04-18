import NuxtConfiguration from '@nuxt/config'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

let config: NuxtConfiguration = {
  srcDir: './src',
  head: {
    title: 'Unvanity',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Unvanity Velocity - Keep track of growth',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#dc46be' },
  css: ['sanitize.css/sanitize.css', '~/assets/css/global.css'],
  router: {
    middleware: 'authenticate-route',
  },
  plugins: [
    { src: '~/services/firebase.ts', ssr: false },
    { src: '~/plugins/auth-cookie.ts', ssr: false },
  ],
  serverMiddleware: [cookieParser(), '~/api/middleware/validate-token.ts'],
  vendor: ['firebase'],
  modules: ['nuxt-session'],
  env: {
    FIREBASE_CLIENT_API_KEY: process.env.FIREBASE_CLIENT_API_KEY || 'x',
    FIREBASE_CLIENT_AUTH_DOMAIN: process.env.FIREBASE_CLIENT_AUTH_DOMAIN || 'x',
    FIREBASE_CLIENT_DATABASE_URL:
      process.env.FIREBASE_CLIENT_DATABASE_URL || 'x',
    FIREBASE_CLIENT_PROJECT_ID: process.env.FIREBASE_CLIENT_PROJECT_ID || 'x',
    FIREBASE_CLIENT_STORAGE_BUCKET:
      process.env.FIREBASE_CLIENT_STORAGE_BUCKET || 'x',
    FIREBASE_CLIENT_MESSAGING_SENDER_ID:
      process.env.FIREBASE_CLIENT_MESSAGING_SENDER_ID || 'x',
  },
}

export default config
