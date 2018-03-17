const express = require('express')
const router = express.Router()

const songs = [
  { id: 1, artist: 'Silvio Rodriguez', title: 'Ojala' },
  {
    id: 2,
    artist: 'Fairport Convention',
    title: 'Who Knows Where The Time Goes'
  },
  { id: 3, artist: 'Simon & Garfunkel', title: 'The Boxer' }
]

router.get('/', (req, res, next) => {
  res.send(songs)
})

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const song = songs.find(s => s.id === id)
  res.send(song)
})

router.post('/', (req, res, next) => {
  const song = {
    id: 4,
    artist: req.body.artist,
    title: req.body.title
  }
  res.status(201).json({ message: 'Song added', song })
})

module.exports = router
