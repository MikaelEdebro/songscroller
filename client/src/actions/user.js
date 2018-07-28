import axios from '../axios-instance'
import { FETCH_USER } from '../actions/types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/user/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const editUser = user => async dispatch => {
  const res = await axios.put('/api/user', user)
  dispatch({ type: FETCH_USER, payload: res.data })
}
