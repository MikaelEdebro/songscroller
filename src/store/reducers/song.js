import * as actionTypes from '../actions/actionTypes'
import songs from 'mock/songs'

const initialState = {
  songs,
  selectedSong: undefined,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  intervalRunning: false,
  playStarted: false,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY:
      return { ...state, playStarted: true }
    case actionTypes.PAUSE:
      return { ...state, playStarted: false }
    case actionTypes.SELECT_SONG:
      return { ...state, selectedSong: action.id }
    default:
      return state
  }
}

export default songReducer
