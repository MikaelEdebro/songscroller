import axios from '../axios-instance'
import { FETCH_USER } from '../actions/types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user')
  console.log('current_user', res.data)
  dispatch({ type: FETCH_USER, payload: res.data })
}
