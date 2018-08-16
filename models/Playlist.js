const mongoose = require('mongoose')
const { Schema } = mongoose

const playlistSchema = new Schema({
  title: { type: String, required: true },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'song',
    },
  ],
  _user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  createdDate: { type: Date, default: new Date() },
})

mongoose.model('playlist', playlistSchema)
