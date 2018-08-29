export interface ConfigKeys {
  baseUrl: string
  cookieKey: string
  mongoURI: string
  googleClientID: string
  googleClientSecret: string
  facebookClientID: string
  facebookClientSecret: string
}

let keys: ConfigKeys = {
  baseUrl: process.env.BASE_URL || '',
  cookieKey: process.env.COOKIE_KEY || '',
  mongoURI: process.env.MONGO_URI || '',
  googleClientID: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  facebookClientID: process.env.FACEBOOK_CLIENT_ID || '',
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
}

if (process.env.NODE_ENV === 'test') {
  keys = {
    baseUrl: 'http://localhost:3000',
    cookieKey: 'dev_fsddesdf234323',
    mongoURI: 'mongodb://songscroller-dev:C36SwfyfF8i2@ds139251.mlab.com:39251/songscroller-dev',
    googleClientID: '565939582121-5016k50pld3mffgrrm8vefdu7cbnuvp5.apps.googleusercontent.com',
    googleClientSecret: 'EzYkYkH72wWh1hmwWHilye8s',
    facebookClientID: '250667428868111',
    facebookClientSecret: '99b22c0bed58a1d9a24a9d29fc5d16fa',
  }
}

export default keys
