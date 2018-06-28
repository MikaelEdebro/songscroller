const songs = require('../mock/songs')

module.exports = app => {
  app.get('/api/songs', (req, res) => {
    res.send(songs)
  })
}
