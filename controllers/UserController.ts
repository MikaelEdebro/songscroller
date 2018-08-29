import User from '../models/User'
import { sanitize } from 'mongo-sanitize'
import { Request, Response, NextFunction } from 'express'
const isTestMode = process.env.NODE_ENV === 'test'
const mockedUser = require('../test/mocks').user

export = {
  getCurrentUser(req: Request, res: Response) {
    if (isTestMode) {
      res.send(mockedUser)
    }

    res.send(req.user)
  },

  editUser(req: Request, res: Response, next: NextFunction) {
    User.findOneAndUpdate(
      { _id: sanitize(req.user._id) },
      {
        settings: sanitize(req.body.settings),
      },
      { new: true }
    )
      .then(user => res.send(user))
      .catch(next)
  },
}
