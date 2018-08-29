import { sanitize } from 'mongo-sanitize'
import { Request } from 'express'
import { User } from '../models'
import { user as mockedUser } from '../test/mocks'
const isTestMode = process.env.NODE_ENV === 'test'

export default class UserService {
  User: typeof User

  constructor(user) {
    this.User = user
  }

  getCurrentUser = (req: Request) => {
    if (isTestMode) {
      return mockedUser
    }

    return req.user
  }

  edit = async (userId: string, values: any) => {
    return await this.User.findOneAndUpdate(
      { _id: userId },
      {
        settings: sanitize(values),
      },
      { new: true }
    )
  }
}
