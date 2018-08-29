import { sanitize } from 'mongo-sanitize'
import { Song } from '../models'

export default class SongService {
  Song: typeof Song

  constructor(song) {
    this.Song = song
  }

  getSongsByUser = async (userId: string) => {
    return await this.Song.find({
      _user: userId,
    })
  }

  getSongById = async (userId: string, songId: string) => {
    return await this.Song.findOne({
      _id: songId,
      _user: userId,
    })
  }

  create = async (userId: string, song: any) => {
    const sanitizedSong = sanitizeSong(song)

    return await this.Song.create({
      ...sanitizedSong,
      _user: userId,
    })
  }

  edit = async (userId: string, songId: string, song: any) => {
    const sanitizedSong = sanitizeSong(song)

    return await this.Song.findOneAndUpdate({ _id: songId, _user: userId }, sanitizedSong, {
      new: true,
    })
  }

  delete = async (userId: string, songId: string) => {
    return await this.Song.remove({
      _id: songId,
      _user: userId,
    })
  }
}

function sanitizeSong(song: any) {
  return {
    artist: sanitize(song.artist),
    title: sanitize(song.title),
    body: sanitize(song.body),
    fontSizes: sanitize(song.fontSizes),
    useMonospaceFont: sanitize(song.useMonospaceFont),
  }
}
