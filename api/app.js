const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')
const songs = require('./routes/songs')

const mongoose = require('mongoose')
mongoose.connect(
  `mongodb://${process.env.MONGO_ATLAS_USERNAME}:${
    process.env.MONGO_ATLAS_PASSWORD
  }@troubadour-shard-00-00-c73g2.mongodb.net:27017,troubadour-shard-00-01-c73g2.mongodb.net:27017,troubadour-shard-00-02-c73g2.mongodb.net:27017/test?ssl=true&replicaSet=Troubadour-shard-0&authSource=admin`
)

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.status(200).json({})
  }
  next()
})

app.use('/', index)
app.use('/users', users)
app.use('/songs', songs)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
