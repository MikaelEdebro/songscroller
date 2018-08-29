import { sanitize } from 'mongo-sanitize'
import { Playlist } from '../models'

export default class PlaylistService {
  Playlist: typeof Playlist

  constructor(playlist) {
    this.Playlist = playlist
  }

  getPlaylistsByUser = async (userId: string) => {
    return await this.Playlist.find({ _user: userId })
  }

  getPlaylistById = async (userId: string, playlistId: string) => {
    return await this.Playlist.findOne({
      _user: userId,
      _id: playlistId,
    }).populate('songs')
  }

  create = async (playlist: any) => {
    return await this.Playlist.create({
      title: sanitize(playlist.title),
      songs: sanitize(playlist.songs),
      _user: sanitize(playlist._user),
    })
  }

  edit = async (userId: string, playlistId: string, playlist: any) => {
    return await this.Playlist.findOneAndUpdate(
      { _id: playlistId, _user: userId },
      {
        title: sanitize(playlist.title),
        songs: sanitize(playlist.songs),
      },
      { new: true }
    ).populate('songs')
  }

  delete = async (userId: string, playlistId: string) => {
    return await this.Playlist.findOneAndRemove({
      _user: userId,
      _id: playlistId,
    })
  }
}
