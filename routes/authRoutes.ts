import passport from 'passport'
import { Request, Response } from 'express'
const LOGIN_REDIRECT_URL = '/songs'

export = app => {
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(LOGIN_REDIRECT_URL)
  })

  app.get('/api/auth/facebook', passport.authenticate('facebook'))

  app.get(
    '/api/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: LOGIN_REDIRECT_URL,
      failureRedirect: '/',
    })
  )

  app.get('/api/auth/logout', (req: Request, res: Response) => {
    req.logout()
    res.redirect('/')
  })
}
