const mongoose = require('mongoose')
const { Schema } = mongoose

const playlistSchema = new Schema({
  title: { type: String, required: true },
  songIds: Array,
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: new Date() },
})

mongoose.model('playlist', playlistSchema)
