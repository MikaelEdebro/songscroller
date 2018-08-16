const requireLogin = require('../middlewares/requireLogin')
const validatePlaylist = require('../middlewares/validation/validatePlaylist')
// const mongoose = require('mongoose')
// const Playlist = mongoose.model('playlist')
// const Song = mongoose.model('song')
// const { validationResult } = require('express-validator/check')
// const sanitize = require('mongo-sanitize')
const PlaylistController = require('../controllers/PlaylistController')

module.exports = app => {
  app.get('/api/playlists', requireLogin, PlaylistController.getPlaylists)

  app.get('/api/playlists/:id', requireLogin, PlaylistController.getPlaylistById)

  app.post('/api/playlists', requireLogin, validatePlaylist, PlaylistController.create)

  app.put('/api/playlists/:id', requireLogin, validatePlaylist, PlaylistController.edit)

  app.delete('/api/playlists/:id', requireLogin, PlaylistController.delete)
}

// async function getSongs(ids) {
//   if (!ids.length) {
//     return []
//   }
//   const songIdsToFetch = ids.map(songId => mongoose.Types.ObjectId(sanitize(songId)))
//   const songs = await Song.find({
//     _id: { $in: songIdsToFetch },
//   }).exec()
//   songs.sort((a, b) => {
//     return ids.indexOf(a._id) - ids.indexOf(b._id)
//   })
//   return songs
// }
