import * as types from '../actions/types'
import { updateObject } from '../core/utility'

const initialState = {
  songs: [],
  currentSong: undefined,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  intervalRunning: false,
  playStarted: false,
  fontSize: 15,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SONGS:
      return updateObject(state, { songs: action.payload })
    case types.PLAY:
      return updateObject(state, {
        playStarted: true,
        isPaused: false,
        isScrolling: true,
      })
    case types.PAUSE:
      return updateObject(state, { playStarted: false, isPaused: true, isScrolling: false })
    case types.SELECT_SONG:
      return updateObject(state, {
        showControls: true,
        playStarted: false,
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
      })
    case types.CHANGE_FONT_SIZE:
      return updateObject(state, { fontSize: state.fontSize + action.value })
    case types.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.value })
    case types.TOGGLE_INTERVAL:
      return updateObject(state, { intervalRunning: action.value })
    case types.SCROLL_COMPLETE:
      return updateObject(state, {
        playStarted: false,
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
      })
    case types.SET_CURRENT_SONG:
      return updateObject(state, { currentSong: action.payload })
    default:
      return state
  }
}

export default songReducer
