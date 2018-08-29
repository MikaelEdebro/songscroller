require('dotenv').config()

const app = require('./app')
let PORT = process.env.PORT || 5000

app.listen(PORT)
