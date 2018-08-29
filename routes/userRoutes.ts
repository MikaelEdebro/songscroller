import requireLogin from '../middlewares/requireLogin'
import UserController from '../controllers/UserController'

export = app => {
  app.get('/api/user/current_user', UserController.getCurrentUser)

  app.put('/api/user', requireLogin, UserController.editUser)
}
