const mongoose = require('mongoose')
const Playlist = mongoose.model('playlist')
const { validationResult } = require('express-validator/check')
const sanitize = require('mongo-sanitize')

module.exports = {
  getPlaylists(req, res, next) {
    Playlist.find({ _user: sanitize(req.user._id) })
      .then(playlists => res.send(playlists))
      .catch(next)
  },

  getPlaylistById(req, res, next) {
    Playlist.findOne({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .populate('songs')
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  create(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }
    Playlist.create({
      title: sanitize(req.body.title),
      songs: sanitize(req.body.songs),
      _user: sanitize(req.user._id),
    })
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  edit(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    Playlist.findOneAndUpdate(
      { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
      {
        title: sanitize(req.body.title),
        songs: sanitize(req.body.songs),
      },
      { new: true }
    )
      .populate('songs')
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  delete(req, res, next) {
    Playlist.findOneAndRemove({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .then(playlist => res.send(playlist))
      .catch(next)
  },
}
