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

  create = async (userId: string, playlist: any) => {
    return await this.Playlist.create({
      title: playlist.title,
      songs: playlist.songs,
      _user: userId,
    })
  }

  edit = async (userId: string, playlistId: string, playlist: any) => {
    return await this.Playlist.findOneAndUpdate(
      { _id: playlistId, _user: userId },
      {
        title: playlist.title,
        songs: playlist.songs,
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
