import { Request } from 'express'
import { User } from '../models'
import mockedUser from '../../tests/mocks/user'

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

  edit = async (userId: string, user: any) => {
    return await this.User.findOneAndUpdate(
      { _id: userId },
      {
        settings: user.settings,
      },
      { new: true }
    )
  }
}
