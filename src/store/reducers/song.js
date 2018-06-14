import * as actionTypes from '../actions/actionTypes'
import songs from 'mock/songs'
import { updateObject } from '../utility'

const initialState = {
  songs,
  selectedSong: undefined,
  showHeader: true,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  intervalRunning: false,
  playStarted: false,
  fontSize: 15,
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
        showHeader: true,
        showControls: true,
        playStarted: false,
        isPaused: true,
        isScrolling: false,
        intervalRunning: false,
      })
    case actionTypes.CHANGE_FONT_SIZE:
      return updateObject(state, { fontSize: state.fontSize + action.value })
    case actionTypes.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.value })
    case actionTypes.TOGGLE_HEADER:
      return updateObject(state, { showHeader: action.value })
    case actionTypes.TOGGLE_INTERVAL:
      return updateObject(state, { intervalRunning: action.value })
    case actionTypes.SCROLL_COMPLETE:
      return updateObject(state, {
        playStarted: false,
        isPaused: true,
        isScrolling: false,
        intervalRunning: false,
      })
    default:
      return state
  }
}

export default songReducer
