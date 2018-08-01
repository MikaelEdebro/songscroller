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

export const editPlaylist = (playlistId, values, history) => async dispatch => {
  const res = await axios.put('/api/playlists/' + playlistId, values)
  dispatch({ type: types.SELECT_PLAYLIST, payload: res.data })

  if (history) {
    history.push('/playlists/' + res.data._id)
  }
}

export const clearSelectedPlaylist = () => ({
  type: types.CLEAR_SELECTED_PLAYLIST,
})
