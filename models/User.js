const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  userId: String,
  authType: String,
})

mongoose.model('user', userSchema)
