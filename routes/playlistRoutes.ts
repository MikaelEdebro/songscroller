import requireLogin from '../middlewares/requireLogin'
import validatePlaylist from '../middlewares/validation/validatePlaylist'
import PlaylistController from '../controllers/PlaylistController'

export = app => {
  app.get('/api/playlists', requireLogin, PlaylistController.getPlaylistsByUser)

  app.get('/api/playlists/:id', requireLogin, PlaylistController.getPlaylistById)

  app.post('/api/playlists', requireLogin, validatePlaylist, PlaylistController.create)

  app.put('/api/playlists/:id', requireLogin, validatePlaylist, PlaylistController.edit)

  app.delete('/api/playlists/:id', requireLogin, PlaylistController.delete)
}
