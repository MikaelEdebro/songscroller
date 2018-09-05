import mongoose, { Document } from 'mongoose'
const Schema = mongoose.Schema

export type SongSchema = {
  artist: string
  title: string
  body: string
  seconds?: number
  fontSizes?: number[]
  useMonospaceFont?: boolean
  _user?: typeof Schema.Types.ObjectId
  createdDate?: Date
  isSeedData?: boolean
}
export type SongDocument = Document & SongSchema

const songSchema = new Schema({
  artist: String,
  title: String,
  body: String,
  seconds: { type: Number, default: 160 },
  fontSizes: Array,
  useMonospaceFont: { type: Boolean, default: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: new Date() },
  isSeedData: Boolean,
})

export default mongoose.model('song', songSchema)
