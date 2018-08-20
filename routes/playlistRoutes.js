const requireLogin = require('../middlewares/requireLogin')
const validatePlaylist = require('../middlewares/validation/validatePlaylist')
const PlaylistController = require('../controllers/PlaylistController')

module.exports = app => {
  app.get('/api/playlists', requireLogin, PlaylistController.getPlaylistsByUser)

  app.get('/api/playlists/:id', requireLogin, PlaylistController.getPlaylistById)

  app.post('/api/playlists', requireLogin, validatePlaylist, PlaylistController.create)

  app.put('/api/playlists/:id', requireLogin, validatePlaylist, PlaylistController.edit)

  app.delete('/api/playlists/:id', requireLogin, PlaylistController.delete)
}
