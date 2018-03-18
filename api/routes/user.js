const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Song = require('../models/song')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
  User.find()
    .select('-__v -password')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(error => res.status(500).json(error))
})

router.get('/:userId', checkAuth, (req, res, next) => {
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

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({ message: 'Auth failed' })
      }

      bcrypt.compare(req.body.password, users[0].password, (error, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: users[0].email,
              userId: users[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          )
          return res
            .status(200)
            .json({ message: 'Auth successful', userId: users[0]._id, token })
        }
        return res.status(401).json({ message: 'Auth failed' })
      })
    })
    .catch()
})

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(409).json({
          messag: 'E-mail already exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            res.status(500).json(error)
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })
            user
              .save()
              .then(result => {
                console.log(result)
                res.status(201).json({ message: 'User created' })
              })
              .catch(error => res.status(500).json(error))
          }
        })
      }
    })
})

router.delete('/:userId', checkAuth, (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted successfully'
      })
    })
    .catch(error => res.status(500).json(error))
})

module.exports = router
