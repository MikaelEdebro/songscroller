import passport from 'passport'
import { Router, Request, Response } from 'express'
const LOGIN_REDIRECT_URL = '/songs'
const router = Router()

router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(LOGIN_REDIRECT_URL)
})

router.get('/api/auth/facebook', passport.authenticate('facebook'))

router.get(
  '/api/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: LOGIN_REDIRECT_URL,
    failureRedirect: '/',
  })
)

router.get('/api/auth/logout', (req: Request, res: Response) => {
  req.logout()
  res.redirect('/')
})

export default router
