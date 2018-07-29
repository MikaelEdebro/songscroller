const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const sanitize = require('mongo-sanitize')

module.exports = app => {
  app.get('/api/user/current_user', (req, res) => {
    res.send(req.user)
  })

  app.put('/api/user', requireLogin, async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: sanitize(req.user._id) },
        {
          settings: sanitize(req.body.settings),
        },
        { new: true }
      ).exec()

      if (!updatedUser) {
        res.status(404).send({ error: 'Could not edit user' })
      } else {
        res.send(updatedUser)
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  })
}
