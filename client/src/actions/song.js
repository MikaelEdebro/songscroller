import * as types from './types'
import axios from '../axios-instance'

export const fetchSongs = () => async dispatch => {
  const res = await axios.get('/api/songs')
  console.log(res.data)
  dispatch({ type: types.FETCH_SONGS, payload: res.data })
}
export const play = () => ({
  type: types.PLAY,
})

export const pause = () => ({
  type: types.PAUSE,
})

export const selectSong = id => ({
  type: types.SELECT_SONG,
  id,
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

export const setEditMode = value => ({
  type: types.SET_EDIT_MODE,
  value,
})
