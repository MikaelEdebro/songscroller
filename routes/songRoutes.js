const songs = require('../mock/songs')
const requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose')
const Song = mongoose.model('song')

module.exports = app => {
  app.get('/api/songs', requireLogin, (req, res) => {
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
}
