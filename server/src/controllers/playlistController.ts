import { Router, Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import validatePlaylist from '../middlewares/validation/validatePlaylist'
import { playlistService } from '../services'
import to from 'await-to-js'
import { validationResult } from 'express-validator/check'

const router = Router()

router.get('/playlists', requireLogin, async (req: any, res: Response, next: NextFunction) => {
  let err
  let playlists
  ;[err, playlists] = await to(playlistService.getPlaylistsByUser(req.user._id.toString()))
  if (err) {
    return next(err)
  }

  res.send(playlists)
})

router.get('/playlists/:id', requireLogin, async (req: any, res: Response, next: NextFunction) => {
  let err
  let playlist
  ;[err, playlist] = await to(
    playlistService.getPlaylistById(req.user._id.toString(), req.params.id)
  )
  if (err) {
    return next(err)
  }

  res.send(playlist)
})

router.post(
  '/playlists',
  requireLogin,
  validatePlaylist,
  async (req: any, res: Response, next: NextFunction) => {
    // todo: refactor validate middleware to move this code there
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let err
    let playlist
    ;[err, playlist] = await to(playlistService.create(req.user._id.toString(), req.body))
    if (err) {
      return next(err)
    }

    res.send(playlist)
  }
)

router.put(
  '/playlists/:id',
  requireLogin,
  validatePlaylist,
  async (req: any, res: Response, next: NextFunction) => {
    // todo: refactor validate middleware to move this code there
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let err
    let playlist
    ;[err, playlist] = await to(
      playlistService.edit(req.user._id.toString(), req.params.id, req.body)
    )
    if (err) {
      return next(err)
    }

    res.send(playlist)
  }
)

router.delete(
  '/playlists/:id',
  requireLogin,
  async (req: any, res: Response, next: NextFunction) => {
    let err
    let playlist
    ;[err, playlist] = await to(playlistService.delete(req.user._id.toString(), req.params.id))
    if (err) {
      return next(err)
    }

    res.status(204).send(playlist)
  }
)

export default router
