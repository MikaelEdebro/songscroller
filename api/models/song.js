const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  artist: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  duration: { type: String }
})

module.exports = mongoose.model('Song', songSchema)
