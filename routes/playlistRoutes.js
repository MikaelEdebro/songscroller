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
    try {
      const playlist = await Playlist.findOne({
        _id: sanitize(req.params.id),
        _user: sanitize(req.user._id),
      })

      const songs = await getSongs(playlist.songIds)
      res.send({ ...playlist._doc, songs })
    } catch (error) {
      res.status(500).send({ error })
    }
  })

  app.post('/api/playlists', requireLogin, validatePlaylist, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }
    try {
      const newPlaylist = await new Playlist({
        title: sanitize(req.body.title),
        songIds: sanitize(req.body.songIds),
        _user: sanitize(req.user._id),
      }).save()

      res.send(newPlaylist)
    } catch (error) {
      res.status(500).send({ error })
    }
  })

  app.put('/api/playlists/:id', requireLogin, validatePlaylist, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    try {
      const editedPlaylist = await Playlist.findOneAndUpdate(
        { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
        {
          title: sanitize(req.body.title),
          songIds: sanitize(req.body.songIds),
        },
        { new: true }
      ).exec()

      const songs = await getSongs(editedPlaylist.songIds)
      res.send({ ...editedPlaylist._doc, songs })
    } catch (error) {
      res.status(500).send({ error })
    }
  })
}

async function getSongs(ids) {
  if (!ids.length) {
    return []
  }
  const songIdsToFetch = ids.map(songId => mongoose.Types.ObjectId(sanitize(songId)))
  const songs = await Song.find({
    _id: { $in: songIdsToFetch },
  }).exec()
  songs.sort((a, b) => {
    return ids.indexOf(a._id) - ids.indexOf(b._id)
  })
  return songs
}
