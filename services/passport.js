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
      callbackURL: keys.baseUrl + '/api/auth/facebook/callback',
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
