const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  userId: String,
  authType: String,
  registerDate: { type: Date, default: new Date() },
})

mongoose.model('user', userSchema)
