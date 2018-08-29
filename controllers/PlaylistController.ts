import Playlist from '../models/Playlist'
import { validationResult } from 'express-validator/check'
import { sanitize } from 'mongo-sanitize'
import { Request, Response, NextFunction } from 'express'

export = {
  getPlaylistsByUser(req: Request, res: Response, next: NextFunction) {
    Playlist.find({ _user: sanitize(req.user._id) })
      .then(playlists => res.send(playlists))
      .catch(next)
  },

  getPlaylistById(req: Request, res: Response, next: NextFunction) {
    Playlist.findOne({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .populate('songs')
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  create(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }
    Playlist.create({
      title: sanitize(req.body.title),
      songs: sanitize(req.body.songs),
      _user: sanitize(req.user._id),
    })
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  edit(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() })
    }

    Playlist.findOneAndUpdate(
      { _id: sanitize(req.params.id), _user: sanitize(req.user._id) },
      {
        title: sanitize(req.body.title),
        songs: sanitize(req.body.songs),
      },
      { new: true }
    )
      .populate('songs')
      .then(playlist => res.send(playlist))
      .catch(next)
  },

  delete(req: Request, res: Response, next: NextFunction) {
    Playlist.findOneAndRemove({
      _id: sanitize(req.params.id),
      _user: sanitize(req.user._id),
    })
      .then(playlist => res.send(playlist))
      .catch(next)
  },
}
