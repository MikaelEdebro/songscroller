const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Song = require('../models/song')

router.get('/', (req, res, next) => {
  User.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(error => res.status(500).json(error))
})

router.get('/:userId', (req, res, next) => {
  let user
  User.findById(req.params.userId)
    .select('-__v')
    .exec()
    .then(userDoc => {
      user = userDoc
      return Song.find({ user: req.params.userId })
        .select('-__v')
        .exec()
    })
    .then(songs => {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        songs
      })
    })
    .catch(error => res.status(500).json(error))
})

router.post('/', (req, res, next) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    email: req.body.email
  })
  user
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => res.status(500).json(error))
})

router.delete('/:id', (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted successfully'
      })
    })
    .catch(error => res.status(500).json(error))
})

module.exports = router
