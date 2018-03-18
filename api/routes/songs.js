const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const SongsController = require('../controllers/songs')

router.get('/', SongsController.getAllSongs)

router.get('/:id', SongsController.getSongById)

router.post('/', checkAuth, SongsController.createSong)

router.patch('/:id', checkAuth, SongsController.updateSong)

router.delete('/:id', checkAuth, SongsController.deleteSong)

module.exports = router
