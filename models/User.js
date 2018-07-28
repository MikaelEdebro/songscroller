const mongoose = require('mongoose')
const { Schema } = mongoose

const defaultSettings = {
  darkMode: false,
}

const userSchema = new Schema({
  userId: String,
  authType: String,
  registerDate: { type: Date, default: new Date() },
  lastLoggedInDate: { type: Date, default: new Date() },
  settings: { type: Object, default: defaultSettings },
})

mongoose.model('user', userSchema)
