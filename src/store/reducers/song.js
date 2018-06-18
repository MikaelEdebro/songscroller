import * as actionTypes from '../actions/actionTypes'
import songs from 'mock/songs'
import { updateObject } from '../utility'

const initialState = {
  songs,
  selectedSong: undefined,
  showSongHeader: true,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  intervalRunning: false,
  playStarted: false,
  fontSize: 15,
  isEditMode: false,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY:
      return updateObject(state, {
        playStarted: true,
        isPaused: false,
        isScrolling: true,
      })
    case actionTypes.PAUSE:
      return updateObject(state, { playStarted: false, isPaused: true, isScrolling: false })
    case actionTypes.SELECT_SONG:
      return updateObject(state, {
        selectedSong: action.id,
        showSongHeader: true,
        showControls: true,
        playStarted: false,
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
        isEditMode: false,
      })
    case actionTypes.CHANGE_FONT_SIZE:
      return updateObject(state, { fontSize: state.fontSize + action.value })
    case actionTypes.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.value })
    case actionTypes.TOGGLE_HEADER:
      return updateObject(state, { showSongHeader: action.value })
    case actionTypes.TOGGLE_INTERVAL:
      return updateObject(state, { intervalRunning: action.value })
    case actionTypes.SCROLL_COMPLETE:
      return updateObject(state, {
        playStarted: false,
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
      })
    case actionTypes.SET_EDIT_MODE:
      return updateObject(state, { isEditMode: action.value })
    default:
      return state
  }
}

export default songReducer
