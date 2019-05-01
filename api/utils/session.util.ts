import { Session } from '../types'

export function getSession(req: any) {
  return (req.session || {}) as Session
}

export function setSession(req: any, session: Partial<Session>) {
  req.session = { ...getSession(req), ...session }
  return getSession(req)
}

export function clearSession(req: any) {
  req.session = undefined
}
