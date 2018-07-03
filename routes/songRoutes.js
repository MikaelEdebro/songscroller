const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const Song = mongoose.model('song')

module.exports = app => {
  app.get('/api/songs', requireLogin, async (req, res) => {
    const songs = await Song.find({
      _user: req.user._id,
    })
    res.send(songs)
  })

  app.post('/api/songs', requireLogin, async (req, res) => {
    const { artist, title, body, seconds } = req.body
    const newSong = await new Song({
      artist,
      title,
      body,
      seconds,
      _user: req.user._id,
    }).save()

    res.send(newSong)
  })

  app.delete('/api/songs/:id', requireLogin, async (req, res) => {
    console.log(req.user)
    console.log(req.params)
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
    } catch (err) {
      res.send(500).send({ error: err })
    }
  })
}
