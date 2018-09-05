import { Song } from '../models'
import songs from '../seed/songs'
import { songService } from '../services'

export default class SeedService {
  Song: typeof Song

  constructor(song) {
    this.Song = song
  }
  seedSongs = async (userId: string) => {
    songs.forEach(async song => {
      await songService.create(userId, {
        _user: userId,
        artist: song.artist,
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
