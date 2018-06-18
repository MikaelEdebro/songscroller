const { createServer } = require('http')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const path = require('path')

const normalizePort = port => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || 5000)

const app = express()
const isProduction = app.get('env') === 'production'

if (isProduction) {
  app.disable('x-powered-by')
  app.use(compression())
}

app.use(morgan(isProduction ? 'common' : 'dev'))

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

const server = createServer(app)
server.listen(PORT, err => {
  if (err) throw err

  console.log('server started on port ' + PORT)
})
