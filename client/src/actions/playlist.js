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
  history.push('/playlists/' + res.data._id)
}

export const editPlaylist = (playlistId, values, history) => async dispatch => {
  console.log({ playlistId, values })
  const res = await axios.put('/api/playlists/' + playlistId, values)
  history.push('/playlists/' + res.data._id)
}

export const clearSelectedPlaylist = () => ({
  type: types.CLEAR_SELECTED_PLAYLIST,
})
