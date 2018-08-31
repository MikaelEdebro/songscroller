import { Router, Request, Response, NextFunction } from 'express'
import requireLogin from '../middlewares/requireLogin'
import validateSong from '../middlewares/validation/validateSong'
import { songService } from '../services'
import to from 'await-to-js'
import { validationResult } from 'express-validator/check'

const router = Router()

router.get('/songs', requireLogin, async (req: any, res: Response, next: NextFunction) => {
  let err
  let songs
  ;[err, songs] = await to(songService.getSongsByUser(req.user._id.toString()))
  if (err) {
    return next(err)
  }

  res.send(songs)
})

router.get('/songs/:id', requireLogin, async (req: any, res: Response, next: NextFunction) => {
  const song = await songService.getSongById(req.user._id.toString(), req.params.id)

  res.send(song)
})

router.post(
  '/songs',
  requireLogin,
  validateSong,
  async (req: any, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let err
    let song
    ;[err, song] = await to(songService.create(req.user._id, req.body))
    if (err) {
      return next(err)
    }

    res.status(201).send(song)
  }
)

router.put(
  '/songs/:id',
  requireLogin,
  validateSong,
  async (req: any, res: Response, next: NextFunction) => {
    const { artist, title, body, useMonospaceFont } = req.body
    const songValues = {
      artist,
      title,
      body,
      useMonospaceFont,
    }
    let err
    let song
    ;[err, song] = await to(songService.edit(req.user._id, req.params.id, songValues))
    if (err) {
      return next(err)
    }

    res.send(song)
  }
)

router.delete('/songs/:id', requireLogin, async (req: any, res: Response, next: NextFunction) => {
  let err
  let song
  ;[err, song] = await to(songService.delete(req.user._id, req.params.id))

  if (err) {
    return next(err)
  }

  res.status(200).send(song)
})

export default router
