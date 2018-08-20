const mongoose = require('mongoose')
const User = mongoose.model('user')
const sanitize = require('mongo-sanitize')
const isTestMode = process.env.NODE_ENV === 'test'
const mockedUser = require('../test/mocks').user

module.exports = {
  getCurrentUser(req, res) {
    if (isTestMode) {
      res.send(mockedUser)
    }

    res.send(req.user)
  },

  editUser(req, res, next) {
    User.findOneAndUpdate(
      { _id: sanitize(req.user._id) },
      {
        settings: sanitize(req.body.settings),
      },
      { new: true }
    )
      .then(user => res.send(user))
      .catch(next)
  },
}
