import * as types from '../actions/types'
import { updateObject } from '../core/utility'

const initialState = {
  playlists: [],
  selectedPlaylist: undefined,
  pendingChanges: false,
}
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PLAYLISTS:
      return updateObject(state, { playlists: action.payload })
    case types.SELECT_PLAYLIST:
      return updateObject(state, { selectedPlaylist: action.payload, pendingChanges: false })
    case types.SAVE_PLAYLIST_LOCAL:
      return updateObject(state, { selectedPlaylist: action.payload, pendingChanges: true })
    case types.SAVE_PLAYLIST_DB:
      return updateObject(state, { pendingChanges: false })
    case types.SET_PLAYLIST_SONGS:
      return updateObject(state, {
        selectedPlaylist: updateObject(state.selectedPlaylist, { songs: action.payload }),
      })
    case types.CLEAR_SELECTED_PLAYLIST:
      return updateObject(state, {
        selectedPlaylist: undefined,
      })
    default:
      return state
  }
}
