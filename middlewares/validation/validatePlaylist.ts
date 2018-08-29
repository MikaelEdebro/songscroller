import { check } from 'express-validator/check'

export default [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title is missing')
    .trim(),
]
