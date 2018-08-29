import { Request, Response, NextFunction } from 'express'
import mockedUser from '../tests/mocks/user'
const isTestMode = process.env.NODE_ENV === 'test'

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
