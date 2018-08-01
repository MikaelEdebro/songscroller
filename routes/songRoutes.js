const requireLogin = require('../middlewares/requireLogin')
const validateSong = require('../middlewares/validation/validateSong')
const mongoose = require('mongoose')
const Song = mongoose.model('song')
const { validationResult } = require('express-validator/check')
const sanitize = require('mongo-sanitize')

module.exports = app => {
  app.get('/api/songs', requireLogin, async (req, res) => {
    const songs = await Song.find({
      _user: sanitize(req.user._id),
    })
    res.send(songs)
  })

  app.get('/api/songs/:id', requireLogin, async (req, res) => {
    try {
      const song = await Song.findOne({
        _id: sanitize(req.params.id),
        _user: sanitize(req.user._id),
      })

      if (!song) {
        res.status(404).send('Song not found')
      } else {
        res.send(song)
      }
    } catch (error) {
      res.status(500).send('Song not found')
    }
  })

  app.post('/api/songs', requireLogin, validateSong, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const artist = sanitize(req.body.artist)
    const title = sanitize(req.body.title)
    const body = sanitize(req.body.body)
    const fontSizes = sanitize(req.body.fontSizes)
    const useMonospaceFont = sanitize(req.body.useMonospaceFont)

    const newSong = await new Song({
      artist,
      title,
      body,
      fontSizes,
      useMonospaceFont,
      _user: req.user._id,
    }).save()

    res.send(newSong)
  })

  app.put('/api/songs/:id', requireLogin, validateSong, async (req, res) => {
    try {
      const artist = sanitize(req.body.artist)
      const title = sanitize(req.body.title)
      const body = sanitize(req.body.body)
      const fontSizes = sanitize(req.body.fontSizes)
      const useMonospaceFont = sanitize(req.body.useMonospaceFont)

      const editedSong = await Song.findOneAndUpdate(
        { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
        {
          artist,
          title,
          body,
          fontSizes,
          useMonospaceFont,
        },
        { new: true }
      ).exec()
      if (!editedSong) {
        return res.status(404).send({ error: 'Couldnt edit the song' })
      } else {
        res.send(editedSong)
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  })

  app.delete('/api/songs/:id', requireLogin, async (req, res) => {
    try {
      const deletedSong = await Song.findOneAndRemove({
        _id: sanitize(req.params.id),
        _user: sanitize(req.user._id),
      })
      if (!deletedSong) {
        return res.status(404).send({ error: 'Couldnt delete the song' })
      } else {
        res.status(204).send('Song successfully deleted')
      }
    } catch (error) {
      res.status(500).send({ error })
    }
  })
}
