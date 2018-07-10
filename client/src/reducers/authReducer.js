import { FETCH_USER } from '../actions/types'

const initialState = {
  loginCheckCompleted: false,
  user: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { loginCheckCompleted: true, user: action.payload || false }
    default:
      return state
  }
}

export default reducer
