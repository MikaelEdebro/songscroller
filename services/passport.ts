import passport from 'passport'
import keys from '../config/keys'
import passportGoogle from 'passport-google-oauth20'
import passportFacebook from 'passport-facebook'
import User, { UserDocument } from '../models/User'
const GoogleStrategy = passportGoogle.Strategy
const FacebookStrategy = passportFacebook.Strategy

passport.serializeUser((user: UserDocument, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  const user: any = await User.findById(id)
  done(null, user)
})

// Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.baseUrl + '/api/auth/google/callback',
      proxy: true,
    },
    callbackMethod
  )
)

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: keys.baseUrl + '/api/auth/facebook/callback',
    },
    callbackMethod
  )
)

async function callbackMethod(accessToken: string, refreshToken: string, profile: any, done: any) {
  const existingUser = await User.findOneAndUpdate(
    {
      userId: profile.id,
      authType: profile.provider,
    },
    {
      lastLoggedInDate: new Date(),
    },
    { new: true }
  ).exec()

  if (existingUser) {
    return done(null, existingUser)
  }

  const newUser = await new User({
    userId: profile.id,
    authType: profile.provider,
  }).save()

  done(null, newUser)
}
