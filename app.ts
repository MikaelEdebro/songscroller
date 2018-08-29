import { default as express, Request, Response } from 'express'
import path from 'path'
import keys from './config/keys'
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const handleErrorMiddleware = require('./middlewares/handleError')

// mongoose config
if (process.env.NODE_ENV !== 'test') {
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise
  console.log(keys.mongoURI)
  mongoose.connect(keys.mongoURI, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  })
}

// mongoose models
require('./models/User')
require('./models/Song')
require('./models/Playlist')

// passport config
require('./services/passport')

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

// routes
require('./routes/authRoutes')(app)
require('./routes/userRoutes')(app)
require('./routes/songRoutes')(app)
require('./routes/playlistRoutes')(app)

// serve up react app in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(handleErrorMiddleware)

module.exports = app
