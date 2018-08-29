import { check } from 'express-validator/check'

export = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is missing')
    .trim(),
]
