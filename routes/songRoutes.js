const requireLogin = require('../middlewares/requireLogin')
const validateSong = require('../middlewares/validation/validateSong')
const SongController = require('../controllers/SongController')

module.exports = app => {
  app.get('/api/songs', requireLogin, SongController.getSongsByUser)

  app.get('/api/songs/:id', requireLogin, SongController.getSongById)

  app.post('/api/songs', requireLogin, validateSong, SongController.addSong)

  app.put('/api/songs/:id', requireLogin, validateSong, SongController.editSong)

  app.delete('/api/songs/:id', requireLogin, SongController.removeSong)
}
