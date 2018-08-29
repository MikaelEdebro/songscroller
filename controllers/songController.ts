import { Router, Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import validateSong from '../middlewares/validation/validateSong'
import { songService } from '../services'

const router = Router()

router.get('/api/songs', requireLogin, async (req: Request, res: Response, next: NextFunction) => {
  const songs = await songService.getSongsByUser(req.user._id.toString())

  // todo: Add error handling
  res.send(songs)
})

router.get(
  '/api/songs/:id',
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    const song = await songService.getSongById(req.user._id.toString(), req.params.id)

    res.send(song)
  }
)

router.post(
  '/api/songs',
  requireLogin,
  validateSong,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.put(
  '/api/songs/:id',
  requireLogin,
  validateSong,
  (req: Request, res: Response, next: NextFunction) => {}
)

router.delete(
  '/api/songs/:id',
  requireLogin,
  (req: Request, res: Response, next: NextFunction) => {}
)

export default router
