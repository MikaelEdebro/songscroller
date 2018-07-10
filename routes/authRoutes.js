const passport = require('passport')
const LOGIN_REDIRECT_URL = '/songs'

module.exports = app => {
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(LOGIN_REDIRECT_URL)
  })

  app.get('/api/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.get('/api/auth/current_user', (req, res) => {
    res.send(req.user)
  })

  app.get('/api/auth/test', (req, res) => {
    res.send('Hello there. Route working!')
  })
}
