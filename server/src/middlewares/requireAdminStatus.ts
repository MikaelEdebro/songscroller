import { Response, NextFunction } from 'express'
const isTestMode = process.env.NODE_ENV === 'test'

const ADMIN_USER_IDS = ['5b8f74cd00d51508a0777ac2']

export default (req: any, res: Response, next: NextFunction) => {
  if (isTestMode) {
    next()
  }
  if (ADMIN_USER_IDS.indexOf(req.user._id.toString()) < 0) {
    res.status(401).send({ error: 'Not authorized' })
  }

  next()
}
