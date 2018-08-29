import requireLogin from '../middlewares/requireLogin'
import validateSong from '../middlewares/validation/validateSong'
import SongController from '../controllers/SongController'

export = app => {
  app.get('/api/songs', requireLogin, SongController.getSongsByUser)

  app.get('/api/songs/:id', requireLogin, SongController.getSongById)

  app.post('/api/songs', requireLogin, validateSong, SongController.create)

  app.put('/api/songs/:id', requireLogin, validateSong, SongController.edit)

  app.delete('/api/songs/:id', requireLogin, SongController.delete)
}
