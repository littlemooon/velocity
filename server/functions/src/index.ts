import NuxtConfiguration from '@nuxt/config'
import * as express from 'express'
import * as functions from 'firebase-functions'
import { Nuxt } from 'nuxt'

const config: NuxtConfiguration = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/',
  },
}

const nuxt = new Nuxt(config)

const app: express.Application = require('express')()

app.use((req, res) => {
  // res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  return nuxt.render(req, res)
})

export let nuxtSsr = functions.https.onRequest((req, res) => {
  try {
    return app(req, res)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
})
