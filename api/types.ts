export interface IUser {
  email?: string
  googleId?: string
  image?: string
  language?: string
  name?: string
  refreshToken?: string | null
  lastLogin?: number
}

export interface ISession {
  user?: IUser
  redirect?: string
  tokens?: {
    refresh_token?: string | null
    expiry_date?: number | null
    access_token?: string | null
    token_type?: string | null
    id_token?: string | null
  }
}
