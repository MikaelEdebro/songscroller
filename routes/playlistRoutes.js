const requireLogin = require('../middlewares/requireLogin')
const validatePlaylist = require('../middlewares/validation/validatePlaylist')
const mongoose = require('mongoose')
const Playlist = mongoose.model('playlist')
const Song = mongoose.model('song')
const { check, validationResult } = require('express-validator/check')

module.exports = app => {
  app.get('/api/playlists', requireLogin, async (req, res) => {
    const playlists = await Playlist.find({ _user: req.user._id })
    res.send(playlists)
  })

  app.get('/api/playlists/:id', requireLogin, async (req, res) => {
    const playlist = await Playlist.findOne({ _id: req.params.id, _user: req.user._id })
    const songIdsToFetch = []
    playlist.songIds.forEach(songId => {
      songIdsToFetch.push(mongoose.Types.ObjectId(songId))
    })
    const songsInPlaylist = await Song.find({ _id: { $in: songIdsToFetch }, _user: req.user._id })

    res.send({ ...playlist._doc, songs: songsInPlaylist })
  })

  app.post('/api/playlists', requireLogin, validatePlaylist, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    const { title, songIds } = req.body
    const newPlaylist = await new Playlist({
      title,
      songIds,
      _user: req.user._id,
    }).save()

    res.send(newPlaylist)
  })
}
