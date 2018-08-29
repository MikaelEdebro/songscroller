import mongoose from 'mongoose'
const User = mongoose.model('user')

export const user = new User({})
