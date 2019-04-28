import NuxtConfiguration from '@nuxt/config'
import './env'

const config: NuxtConfiguration = {
  srcDir: './',
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
  // plugins: [
  //   { src: '~/services/firebase.ts', ssr: false },
  //   { src: '~/plugins/auth-cookie.ts', ssr: false },
  // ],
  serverMiddleware: [
    '~/api/index.ts',
    { path: '/api/auth', handler: '~/api/routes/auth.ts' },
  ],
  vendor: ['firebase'],
  env: {},
}

export default config
