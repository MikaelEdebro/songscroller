import dotenv from 'dotenv'
dotenv.config()

export interface IConfigKeys {
  baseUrl: string
  cookieKey: string
  mongoURI: string
  googleClientID: string
  googleClientSecret: string
  facebookClientID: string
  facebookClientSecret: string
}

const keys: IConfigKeys = {
  baseUrl: process.env.BASE_URL || '',
  cookieKey: process.env.COOKIE_KEY || '',
  mongoURI: process.env.MONGO_URI || '',
  googleClientID: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  facebookClientID: process.env.FACEBOOK_CLIENT_ID || '',
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
}

export default keys
