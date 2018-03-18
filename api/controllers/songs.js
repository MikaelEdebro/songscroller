const mongoose = require('mongoose')

const Song = require('../models/song')

const getAllSongs = (req, res, next) => {
  Song.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.send(docs)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

const getSongById = (req, res, next) => {
  Song.findById(req.params.id)
    .select('-__v')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: 'No valid entry with the provided ID'
        })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

const createSong = (req, res, next) => {
  const song = new Song({
    _id: new mongoose.Types.ObjectId(),
    user: new mongoose.Types.ObjectId(req.body.user),
    artist: req.body.artist,
    title: req.body.title,
    body: req.body.body,
    duration: req.body.duration
  })
  song
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

const updateSong = (req, res, next) => {
  const updateOps = {}
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Song.update(
    {
      _id: req.params.id
    },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

const deleteSong = (req, res, next) => {
  Song.remove({
    _id: req.params.id
  })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getAllSongs = getAllSongs
exports.getSongById = getSongById
exports.createSong = createSong
exports.updateSong = updateSong
exports.deleteSong = deleteSong
