import passport from 'passport'
import { Router, Request, Response } from 'express'

const LOGIN_REDIRECT_URL = '/songs'
const router = Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.redirect(LOGIN_REDIRECT_URL)
  }
)

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: LOGIN_REDIRECT_URL,
    failureRedirect: '/',
  })
)

router.get('/auth/logout', (req: Request, res: Response) => {
  req.logout()
  res.redirect('/')
})

export default router
