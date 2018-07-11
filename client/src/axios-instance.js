import axios from 'axios'
const isProduction = process.env.NODE_ENV === 'production'

const instance = axios.create({
  baseURL: isProduction ? 'http://www.songscroller.io/' : 'http://localhost:3000',
})

export default instance
