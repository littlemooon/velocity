import cookieParser from 'cookie-parser'
import admin from 'firebase-admin'
import * as xml from 'xmlhttprequest'
import { RequestHandler, Request, Response } from 'express'

// @ts-ignore
global.XMLHttpRequest = xml.XMLHttpRequest

let AdminApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_SERVER_PRIVATE_KEY || 'xxx').replace(
      /\\n/g,
      '\n'
    ),
    projectId: process.env.FIREBASE_SERVER_PROJECT_ID,
  }),
  databaseURL: process.env.FIREBASE_SERVER_DATABASE_URL,
})

function getTokenFromRequest(
  req: Request,
  res: Response
): Promise<string | undefined> {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    return Promise.resolve(req.headers.authorization.split('Bearer ')[1])
  }

  return new Promise(resolve => {
    cookieParser()(req, res, () => {
      if (req.cookies && req.cookies.__session) {
        resolve(req.cookies.__session)
      } else {
        resolve()
      }
    })
  })
}

async function addUserToRequest(idToken: string, req: Request, res: Response) {
  try {
    let user = await AdminApp.auth().verifyIdToken(idToken)

    if (req.session) {
      req.session.user = user
    }
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error)
    res.clearCookie('__session')
  }
}

let validateToken: RequestHandler = async (req, res, next) => {
  let user = req.session && req.session.user

  try {
    let token = await getTokenFromRequest(req, res)

    if (user) {
      if (!token) {
        req.session = undefined
      }
    } else {
      if (token) {
        await addUserToRequest(token, req, res)
      }
    }
  } finally {
    next()
  }
}

export default validateToken
