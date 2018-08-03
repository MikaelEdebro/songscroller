import axios from '../axios-instance'
import * as types from './types'

export const fetchPlaylists = () => async dispatch => {
  const res = await axios.get('/api/playlists')
  dispatch({ type: types.FETCH_PLAYLISTS, payload: res.data })
}

export const fetchAndSelectPlaylist = id => async dispatch => {
  const res = await axios.get('/api/playlists/' + id)
  dispatch({ type: types.SELECT_PLAYLIST, payload: res.data })
}

export const addPlaylist = (values, history) => async dispatch => {
  const res = await axios.post('/api/playlists', values)
  if (history) {
    history.push('/playlists/' + res.data._id)
  }
}

export const savePlaylistLocal = playlist => dispatch => {
  dispatch({ type: types.SAVE_PLAYLIST_LOCAL, payload: playlist })
}

export const savePlaylistDb = (playlist, history) => async dispatch => {
  const { title, songIds } = playlist
  const values = { title, songIds }
  dispatch({ type: types.SAVE_PLAYLIST_DB, payload: values })
  const res = await axios.put('/api/playlists/' + playlist._id, values)

  if (history) {
    history.push('/playlists/' + res.data._id)
  }
}

export const clearSelectedPlaylist = () => ({
  type: types.CLEAR_SELECTED_PLAYLIST,
})

export const deletePlaylist = (playlistId, history) => async dispatch => {
  await axios.delete('/api/playlists/' + playlistId)
  dispatch({ type: types.DELETE_PLAYLIST, payload: playlistId })
  if (history) {
    history.push('/playlists')
  }
}
