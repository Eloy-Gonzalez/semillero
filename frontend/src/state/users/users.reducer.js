import { Map } from 'immutable'

import {
  SET_ONE_USER
} from './users.actionsTypes'

const initialState = Map().merge({
  user: {
    isAuthenticated: false,
    username: ''
  },
})

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ONE_USER:
      return state.merge({
        user: payload
      })

    default:
      return state
  }
}

export default authReducer