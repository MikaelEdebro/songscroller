import Song from '../models/Song'
import { sanitize } from 'mongo-sanitize'
import { validationResult } from 'express-validator/check'
import { Request, Response, NextFunction } from 'express'

export = {
  getSongsByUser(req: Request, res: Response, next: NextFunction) {
    Song.find({
      _user: sanitize(req.user._id),
    })
      .then(songs => {
        res.send(songs)
      })
      .catch(next)
  },

  getSongById(req: Request, res: Response, next: NextFunction) {
    Song.findOne({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .then(song => {
        res.send(song)
      })
      .catch(next)
  },

  create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const artist = sanitize(req.body.artist)
    const title = sanitize(req.body.title)
    const body = sanitize(req.body.body)
    const fontSizes = sanitize(req.body.fontSizes)
    const useMonospaceFont = sanitize(req.body.useMonospaceFont)

    Song.create({
      artist,
      title,
      body,
      fontSizes,
      useMonospaceFont,
      _user: req.user._id,
    })
      .then(song => res.send(song))
      .catch(next)
  },

  edit(req: Request, res: Response, next: NextFunction) {
    const artist = sanitize(req.body.artist)
    const title = sanitize(req.body.title)
    const body = sanitize(req.body.body)
    const fontSizes = sanitize(req.body.fontSizes)
    const useMonospaceFont = sanitize(req.body.useMonospaceFont)

    Song.findOneAndUpdate(
      { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
      {
        artist,
        title,
        body,
        fontSizes,
        useMonospaceFont,
      },
      { new: true }
    )
      .then(song => res.send(song))
      .catch(next)
  },

  delete(req: Request, res: Response, next: NextFunction) {
    Song.remove({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .then(() => res.status(204).send('Song successfully deleted'))
      .catch(next)
  },
}
