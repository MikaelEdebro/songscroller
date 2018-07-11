import * as types from '../actions/types'
import { updateObject } from '../core/utility'

const initialState = {
  songs: [],
  selectedSong: undefined,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  intervalRunning: false,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SONGS:
      return updateObject(state, { songs: action.payload })
    case types.PLAY:
      return updateObject(state, {
        isPaused: false,
        isScrolling: true,
      })
    case types.PAUSE:
      return updateObject(state, { isPaused: true, isScrolling: false })
    case types.SELECT_SONG:
      return updateObject(state, {
        selectedSong: action.payload,
        showControls: true,
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
      })
    case types.CLEAR_SELECTED_SONG:
      return updateObject(state, { selectedSong: undefined })
    case types.CHANGE_FONT_SIZE:
      return updateObject(state, {
        selectedSong: updateObject(state.selectedSong, {
          fontSize: state.selectedSong.fontSize + action.value,
        }),
      })
    case types.CHANGE_SCROLL_SPEED:
      return updateObject(state, {
        selectedSong: updateObject(state.selectedSong, {
          seconds: state.selectedSong.seconds + action.value,
        }),
      })
    case types.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.value })
    case types.TOGGLE_INTERVAL:
      return updateObject(state, { intervalRunning: action.value })
    case types.SCROLL_COMPLETE:
      return updateObject(state, {
        isPaused: false,
        isScrolling: false,
        intervalRunning: false,
      })
    default:
      return state
  }
}

export default songReducer
