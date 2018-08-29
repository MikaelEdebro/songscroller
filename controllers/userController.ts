import express, { Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import { userService } from '../services'
const router = express.Router()

router.get('/api/user/current_user', async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.getCurrentUser(req)
  res.send(user)
})

router.put('/api/user', requireLogin, async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.edit(req.user._id, req.body)
  res.send(user)
})

export default router
