import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer'
import songReducer from './songReducer'

export default combineReducers({
  auth: authReducer,
  song: songReducer,
  form: reduxForm,
})
