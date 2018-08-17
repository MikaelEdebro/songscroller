const mongoose = require('mongoose')
const User = mongoose.model('user')

module.exports.user = new User({})
