import UserService from './UserService'
import SongService from './SongService'
import PlaylistService from './PlaylistService'
import { User, Song, Playlist } from '../models'

const userService = new UserService(User)
const songService = new SongService(Song)
const playlistService = new PlaylistService(Playlist)

export { userService, songService, playlistService }
