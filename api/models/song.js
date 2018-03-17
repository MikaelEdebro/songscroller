const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  artist: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true }
})

module.exports = mongoose.model('Song', songSchema)
