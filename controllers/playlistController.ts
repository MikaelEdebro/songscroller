import { Router, Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import validatePlaylist from '../middlewares/validation/validatePlaylist'
import { playlistService } from '../services'

const router = Router()
router.get('/api/playlists', requireLogin, (req: Request, res: Response, next: NextFunction) => {})

router.get(
  '/api/playlists/:id',
  requireLogin,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.post(
  '/api/playlists',
  requireLogin,
  validatePlaylist,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.put(
  '/api/playlists/:id',
  requireLogin,
  validatePlaylist,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.delete(
  '/api/playlists/:id',
  requireLogin,
  (req: Request, res: Response, next: NextFunction) => {}
)

export default router
