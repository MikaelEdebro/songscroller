const { check } = require('express-validator/check')

module.exports = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is missing')
    .trim(),
]
