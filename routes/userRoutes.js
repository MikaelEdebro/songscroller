const requireLogin = require('../middlewares/requireLogin')

const UserController = require('../controllers/UserController')

module.exports = app => {
  app.get('/api/user/current_user', UserController.getCurrentUser)

  app.put('/api/user', requireLogin, UserController.editUser)
}
