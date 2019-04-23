import * as functions from 'firebase-functions'
import { Nuxt } from 'nuxt'

const express = require('express')

const config = {
  dev: false,
  buildDir: '../nuxt',
  build: {
    publicPath: '/assets/',
  },
}

const nuxt = new Nuxt(config)

const app = express()

app.use((req, res) => {
  // res.set('Cache-Control', 'public, max-age=300, s-maxage=600')

  return new Promise((resolve, reject) => {
    nuxt.render(req, res, (promise: Promise<any>) => {
      promise.then(resolve).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  })
})

export let nuxtSsr = functions.https.onRequest(app)
