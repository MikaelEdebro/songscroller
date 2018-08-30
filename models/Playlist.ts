import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export type PlaylistDocument = Document & {
  title: string
  songs: any[]
  _user: any
  createdDate: Date
}

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

export default mongoose.model('playlist', playlistSchema)
