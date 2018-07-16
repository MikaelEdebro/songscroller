const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema({
  artist: String,
  title: String,
  body: String,
  seconds: { type: Number, default: 160 },
  fontSizes: Array,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
})

mongoose.model('song', songSchema)
