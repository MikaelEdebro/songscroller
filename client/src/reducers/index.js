import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import songReducer from './songReducer'
import playlistReducer from './playlistReducer'

export default combineReducers({
  auth: authReducer,
  song: songReducer,
  form: reduxForm,
  playlist: playlistReducer,
})
