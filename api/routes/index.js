const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Troubadour API')
})

module.exports = router
