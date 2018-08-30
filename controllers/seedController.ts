import express, { Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import { seedService } from '../services'
const router = express.Router()

router.post(
  '/seed/songs',
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    await seedService.seedSongs(req.user._id)
    res.send({})
  }
)

export default router
