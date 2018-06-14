import * as actionTypes from './actionTypes'

export const play = () => ({
  type: actionTypes.PLAY,
})

export const pause = () => ({
  type: actionTypes.PAUSE,
})

export const selectSong = id => ({
  type: actionTypes.SELECT_SONG,
  id,
})

export const changeFontSize = value => ({
  type: actionTypes.CHANGE_FONT_SIZE,
  value,
})

export const toggleControls = value => ({
  type: actionTypes.TOGGLE_CONTROLS,
  value,
})

export const toggleHeader = value => ({
  type: actionTypes.TOGGLE_HEADER,
  value,
})

export const toggleInterval = value => ({
  type: actionTypes.TOGGLE_INTERVAL,
  value,
})

export const scrollComplete = () => ({
  type: actionTypes.SCROLL_COMPLETE,
})
