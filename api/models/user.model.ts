import { instances } from 'gstore-node'
import env from '../../env'

export interface IUser {
  email: string
  googleId: string
  googleRefreshToken?: string
  image?: string
  language?: string
  name?: string
  lastLogin: number
}

const gstore = instances.get(env.gstoreId)

const { Schema } = gstore

const userSchema = new Schema<IUser>({
  email: { type: String, validate: 'isEmail', required: true },
  googleId: { type: String, required: true },
  googleRefreshToken: { type: String },
  image: { type: String },
  language: { type: String },
  name: { type: String },
  lastLogin: { type: Number, required: true },
})

export default gstore.model<IUser>('User', userSchema)
