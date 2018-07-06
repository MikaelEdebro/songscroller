const requireLogin = require('../middlewares/requireLogin')
const validateSong = require('../middlewares/validation/validateSong')
const mongoose = require('mongoose')
const Song = mongoose.model('song')

module.exports = app => {
  app.get('/api/songs', requireLogin, async (req, res) => {
    const songs = await Song.find({
      _user: req.user._id,
    })
    res.send(songs)
  })

  app.get('/api/songs/:id', requireLogin, async (req, res) => {
    try {
      const song = await Song.findById(req.params.id)

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
    const { artist, title, body } = req.body
    const newSong = await new Song({
      artist,
      title,
      body,
      _user: req.user._id,
    }).save()

    res.send(newSong)
  })

  app.put('/api/songs/:id', requireLogin, validateSong, async (req, res) => {
    try {
      const { artist, title, body } = req.body
      const editedSong = await Song.findOneAndUpdate(
        { _id: req.params.id, _user: req.user._id },
        {
          artist,
          title,
          body,
        }
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
        _id: req.params.id,
        _user: req.user._id,
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
