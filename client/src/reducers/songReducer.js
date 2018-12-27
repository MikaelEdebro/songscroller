import * as types from '../actions/types'
import { updateObject } from '../core/utility'

const initialState = {
  songs: [],
  selectedSong: undefined,
  showControls: true,
  isScrolling: false,
  isPaused: false,
  isInReplayTransition: false,
  shouldSaveUpdatedSong: false,
  shouldReFetchSongs: false,
  isFetchingSongs: true,
  songNotFound: false,
}

const changeFontSize = (state, action) => {
  const defaultFontSize = 15
  const fontSizes = [...state.selectedSong.fontSizes]
  const existingFontSizeForViewport = fontSizes.findIndex(
    f => f.viewportWidth === window.innerWidth
  )
  if (existingFontSizeForViewport < 0) {
    fontSizes.push({ fontSize: defaultFontSize + action.value, viewportWidth: window.innerWidth })
  } else {
    fontSizes[existingFontSizeForViewport].fontSize += action.value
  }

  return updateObject(state, {
    selectedSong: updateObject(state.selectedSong, {
      fontSizes,
    }),
    shouldSaveUpdatedSong: true,
  })
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SONGS:
      return updateObject(state, {
        songs: action.payload,
        shouldReFetchSongs: false,
        isFetchingSongs: false,
      })
    case types.SET_IS_FETCHING_SONGS:
      return updateObject(state, { isFetchingSongs: true })
    case types.PLAY:
      return updateObject(state, {
        isPaused: false,
        isScrolling: true,
        isInReplayTransition: false,
      })
    case types.PAUSE:
      return updateObject(state, { isPaused: true, isScrolling: false })
    case types.REPLAY:
      return updateObject(state, {
        isInReplayTransition: true,
        isPaused: false,
        isScrolling: false,
      })
    case types.SELECT_SONG:
      return updateObject(state, {
        selectedSong: action.payload,
        showControls: true,
        isPaused: false,
        isScrolling: false,
        isInReplayTransition: false,
        songNotFound: false,
      })
    case types.CLEAR_SELECTED_SONG:
      return updateObject(state, { selectedSong: undefined })
    case types.CHANGE_FONT_SIZE:
      return changeFontSize(state, action)
    case types.CHANGE_SCROLL_SPEED:
      return updateObject(state, {
        selectedSong: updateObject(state.selectedSong, {
          seconds: state.selectedSong.seconds + action.value,
        }),
        shouldSaveUpdatedSong: true,
      })
    case types.TRANSPOSE_SONG:
      return updateObject(state, {
        selectedSong: updateObject(state.selectedSong, {
          transpose: action.value,
          transposeTotal: (state.selectedSong.transposeTotal || 0) + action.value,
        }),
      })
    case types.RESET_TRANSPOSE:
      return updateObject(state, {
        selectedSong: updateObject(state.selectedSong, {
          transpose: 0,
        }),
      })
    case types.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.value })
    case types.SCROLL_COMPLETE:
      return updateObject(state, {
        isPaused: false,
        isScrolling: false,
      })
    case types.EDIT_COMPLETE:
      return updateObject(state, {
        shouldSaveUpdatedSong: false,
      })
    case types.ADD_SONG:
      return updateObject(state, { shouldReFetchSongs: true })
    case types.DELETE_SONG:
      return updateObject(state, { shouldReFetchSongs: true })
    case types.SONG_NOT_FOUND:
      return updateObject(state, { songNotFound: true })
    default:
      return state
  }
}

export default songReducer
