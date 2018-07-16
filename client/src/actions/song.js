import * as types from './types'
import axios from '../axios-instance'

export const play = () => ({
  type: types.PLAY,
})

export const pause = () => ({
  type: types.PAUSE,
})

export const replay = () => ({
  type: types.REPLAY,
})

export const changeFontSize = value => ({
  type: types.CHANGE_FONT_SIZE,
  value,
})

export const transposeSong = value => dispatch => {
  dispatch({
    type: types.TRANSPOSE_SONG,
    value,
  })

  setTimeout(() => {
    dispatch({
      type: types.RESET_TRANSPOSE,
    })
  }, 200)
}

export const changeScrollSpeed = value => ({
  type: types.CHANGE_SCROLL_SPEED,
  value,
})

export const toggleControls = value => ({
  type: types.TOGGLE_CONTROLS,
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

export const editSong = (songId, values, history) => async dispatch => {
  const res = await axios.put('/api/songs/' + songId, values)

  dispatch({ type: types.EDIT_COMPLETE })

  // allow to not pass history and prevent redirect, like when changing fontSize etc
  if (history) {
    dispatch({ type: types.CLEAR_SELECTED_SONG })
    history.push('/songs/' + res.data._id)
  }
}

export const deleteSong = (songId, history) => async () => {
  await axios.delete('/api/songs/' + songId)
  history.push('/songs?refresh=' + songId)
}
