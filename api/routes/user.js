const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const UserController = require('../controllers/user')

router.get('/', UserController.getAllUsers)
router.get('/:userId', checkAuth, UserController.getUserById)
router.post('/login', UserController.login)
router.post('/signup', UserController.signup)
router.delete('/:userId', checkAuth, UserController.deleteUserById)

module.exports = router
