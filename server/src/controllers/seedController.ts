import express, { Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import requireAdminStatus from '../middlewares/requireAdminStatus'
import { seedService } from '../services'
const router = express.Router()

router.get(
  '/seed/songs',
  requireLogin,
  requireAdminStatus,
  async (req: any, res: Response, next: NextFunction) => {
    await seedService.seedSongs(req.user._id.toString())
    res.send('Songs seeded correctly')
  }
)

router.get(
  '/seed/songs/delete',
  requireLogin,
  requireAdminStatus,
  async (req: any, res: Response, next: NextFunction) => {
    await seedService.removeSeedData(req.user._id.toString())
    res.send('Songs removed correctly')
  }
)

export default router
