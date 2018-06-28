const express = require('express')
const PORT = process.env.PORT || 5000
const path = require('path')
const keys = require('./config/keys')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

// mongoose config
const mongoose = require('mongoose')
mongoose.connect(keys.mongoURI)

// mongoose models
require('./models/User')
require('./models/Song')

// passport config
require('./services/passport')

const app = express()
app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send({ helloo: 'yeah' })
})

// routes
require('./routes/authRoutes')(app)
require('./routes/songRoutes')(app)

// serve up react app in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT)
