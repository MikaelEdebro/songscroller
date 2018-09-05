import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export type UserDocument = Document & {
  userId: string
  authType: string
  registerDate: Date
  lastLoggedInDate: Date
  settings: {
    darkMode: boolean
  }
}

const defaultSettings = {
  darkMode: false,
}

const userSchema = new Schema({
  userId: String,
  authType: String,
  registerDate: { type: Date, default: new Date() },
  lastLoggedInDate: { type: Date, default: new Date() },
  settings: { type: Object, default: defaultSettings },
})

export default mongoose.model('user', userSchema)
