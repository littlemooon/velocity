import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
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
}

export default config
