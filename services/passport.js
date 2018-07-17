const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
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

async function callbackMethod(accessToken, refreshToken, profile, done) {
  const existingUser = await User.findOneAndUpdate(
    {
      userId: profile.id,
      authType: profile.provider,
    },
    {
      lastLoggedInDate: new Date(),
    }
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
