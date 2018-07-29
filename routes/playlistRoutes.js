const requireLogin = require('../middlewares/requireLogin')
const validatePlaylist = require('../middlewares/validation/validatePlaylist')
const mongoose = require('mongoose')
const Playlist = mongoose.model('playlist')
const Song = mongoose.model('song')
const { validationResult } = require('express-validator/check')
const sanitize = require('mongo-sanitize')

module.exports = app => {
  app.get('/api/playlists', requireLogin, async (req, res) => {
    const playlists = await Playlist.find({ _user: sanitize(req.user._id) })
    res.send(playlists)
  })

  app.get('/api/playlists/:id', requireLogin, async (req, res) => {
    const playlist = await Playlist.findOne({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
    const songIdsToFetch = []
    playlist.songIds.forEach(songId => {
      songIdsToFetch.push(mongoose.Types.ObjectId(sanitize(songId)))
    })
    const songsInPlaylist = await Song.find({
      _id: { $in: songIdsToFetch },
      _user: sanitize(req.user._id),
    })

    res.send({ ...playlist._doc, songs: songsInPlaylist })
  })

  app.post('/api/playlists', requireLogin, validatePlaylist, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    const title = sanitize(req.body.title)
    const songIds = sanitize(req.body.songIds)
    const newPlaylist = await new Playlist({
      title,
      songIds,
      _user: sanitize(req.user._id),
    }).save()

    res.send(newPlaylist)
  })

  app.put('/api/playlists/:id', requireLogin, validatePlaylist, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    try {
      const title = sanitize(req.body.title)
      const songIds = sanitize(req.body.songIds)
      const editedPlaylist = await Playlist.findOneAndUpdate(
        { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
        {
          title,
          songIds,
        }
      ).exec()

      if (!editedPlaylist) {
        return res.status(404).send({ error: 'Couldnt edit the playlist' })
      } else {
        res.send(editedPlaylist)
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  })
}
