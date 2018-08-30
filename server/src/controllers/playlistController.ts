import { Router, Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import validatePlaylist from '../middlewares/validation/validatePlaylist'
import { playlistService } from '../services'

const router = Router()

router.get('/playlists', requireLogin, (req: Request, res: Response, next: NextFunction) => {})

router.get('/playlists/:id', requireLogin, (req: Request, res: Response, next: NextFunction) => {})

router.post(
  '/playlists',
  requireLogin,
  validatePlaylist,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.put(
  '/playlists/:id',
  requireLogin,
  validatePlaylist,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.delete(
  '/playlists/:id',
  requireLogin,
  (req: Request, res: Response, next: NextFunction) => {}
)

export default router
