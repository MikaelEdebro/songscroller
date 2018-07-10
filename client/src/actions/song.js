import * as types from './types'
import axios from '../axios-instance'

export const play = () => ({
  type: types.PLAY,
})

export const pause = () => ({
  type: types.PAUSE,
})

export const changeFontSize = value => ({
  type: types.CHANGE_FONT_SIZE,
  value,
})

export const toggleControls = value => ({
  type: types.TOGGLE_CONTROLS,
  value,
})

export const toggleHeader = value => ({
  type: types.TOGGLE_HEADER,
  value,
})

export const toggleInterval = value => ({
  type: types.TOGGLE_INTERVAL,
  value,
})

export const scrollComplete = () => ({
  type: types.SCROLL_COMPLETE,
})

export const fetchSongs = () => async dispatch => {
  const res = await axios.get('/api/songs')
  dispatch({ type: types.FETCH_SONGS, payload: res.data })
}

export const fetchAndSelectSong = songId => async dispatch => {
  const res = await axios.get('/api/songs/' + songId)
  dispatch({ type: types.SELECT_SONG, payload: res.data })
}

export const selectSong = song => dispatch => {
  dispatch({ type: types.SELECT_SONG, payload: song })
}

export const clearSelectedSong = () => dispatch => {
  dispatch({ type: types.CLEAR_SELECTED_SONG })
}

export const addSong = (song, history) => async () => {
  const res = await axios.post('/api/songs', song)
  history.push('/songs/' + res.data._id)
}

export const editSong = (songId, values, history) => async () => {
  const res = await axios.put('/api/songs/' + songId, values)
  history.push('/songs/' + res.data._id)
}

export const deleteSong = (songId, history) => async () => {
  await axios.delete('/api/songs/' + songId)
  history.push('/songs?refresh=' + songId)
}
