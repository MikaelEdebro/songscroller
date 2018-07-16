const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('user')

let callbackBaseUrl
switch (keys.environment) {
  case 'staging':
    callbackBaseUrl = 'https://songscroller-staging.herokuapp.com'
    break
  case 'prod':
    callbackBaseUrl = 'http://beta.songscroller.io'
    break
  default:
    callbackBaseUrl = 'http://localhost:3000'
}

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
      callbackURL: callbackBaseUrl + '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        userId: profile.id,
        authType: 'google',
      })

      if (existingUser) {
        return done(null, existingUser)
      }

      const newUser = await new User({
        userId: profile.id,
        authType: 'google',
      }).save()

      done(null, newUser)
    }
  )
)

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: callbackBaseUrl + '/api/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        userId: profile.id,
        authType: 'facebook',
      })

      if (existingUser) {
        return done(null, existingUser)
      }

      const newUser = await new User({
        userId: profile.id,
        authType: 'facebook',
      }).save()

      done(null, newUser)
    }
  )
)
