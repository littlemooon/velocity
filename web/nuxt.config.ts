import NuxtConfiguration from '@nuxt/config'
import './env'

const nuxtConfig: NuxtConfiguration = {
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
  modules: ['nuxt-vuex-router-sync', 'portal-vue/nuxt'],
  serverMiddleware: ['~/api/index.ts'],
  env: {
    WEB_URL: process.env.WEB_URL || '',
  },
  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}

export default nuxtConfig
