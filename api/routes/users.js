const express = require('express')
const router = express.Router()

// todo: get users from Mongo
const users = [{ username: 'MikaelEdebro' }, { username: 'Miguel' }]

router.get('/', (req, res, next) => {
  res.send(users)
})

router.post('/', (req, res, next) => {
  res.status(201).json('Handle POST for /users')
})

module.exports = router
