import { Request, Response, NextFunction } from 'express'
const isTestMode = process.env.NODE_ENV === 'test'
const mockedUser = require('../test/mocks').user

export default (req: Request, res: Response, next: NextFunction) => {
  // make sure we can still access routes in tests, create mock user
  if (isTestMode) {
    req.user = mockedUser
  }

  if (!req.user) {
    res.status(401).send({ error: 'Not authorized' })
  }

  next()
}
