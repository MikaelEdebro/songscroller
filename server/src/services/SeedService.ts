import { Song } from '../models'
import songs from '../seed/songs'

export default class SeedService {
  Song: typeof Song

  constructor(song) {
    this.Song = song
  }
  seedSongs = async (userId: string) => {
    songs.forEach(async song => {
      await this.Song.create({
        _user: userId,
        artist: song.title,
        title: song.title,
        body: song.body,
        isSeedData: true,
      })
    })
  }

  removeSeedData = async (userId: string) => {
    await this.Song.remove({ _user: userId, isSeedData: true })
  }
}
