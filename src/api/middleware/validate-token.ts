import cookieParser from 'cookie-parser'
import { Request, RequestHandler, Response } from 'express'
import * as xml from 'xmlhttprequest'
import * as firebase from '../services/firebase'

// @ts-ignore
global.XMLHttpRequest = xml.XMLHttpRequest

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

async function addUserToRequest(idToken: string, req: Request) {
  const user = await firebase.auth.verifyIdToken(idToken)

  if (req.session) {
    req.session.user = user
  }
}

const validateToken: RequestHandler = async (req, res, next) => {
  const user = req.session && req.session.user

  try {
    const token = await getTokenFromRequest(req, res)

    if (token && !user) {
      // LOGIN
      await addUserToRequest(token, req)
    }

    if (user && !token) {
      // LOGOUT
      req.session = undefined
    }
  } catch (e) {
    console.error('validateToken:', e)
    req.session = undefined
  } finally {
    next()
  }
}

export default validateToken
