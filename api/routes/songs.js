const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Song = require('../models/song')

router.get('/', (req, res, next) => {
  Song.find()
    .exec()
    .then(docs => {
      res.send(docs)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/:id', (req, res, next) => {
  Song.findById(req.params.id)
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
})

router.post('/', (req, res, next) => {
  const song = new Song({
    _id: new mongoose.Types.ObjectId(),
    artist: req.body.artist,
    title: req.body.title,
    body: req.body.body
  })
  song
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.patch('/:id', (req, res, next) => {
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
})

router.delete('/:id', (req, res, next) => {
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
})

module.exports = router
