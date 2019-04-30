import { ISession } from '../types'

export function getSession(req: any) {
  return (req.session || {}) as ISession
}

export function setSession(req: any, session: Partial<ISession>) {
  req.session = { ...getSession(req), ...session }
  return getSession(req)
}

export function clearSession(req: any) {
  req.session = undefined
}
