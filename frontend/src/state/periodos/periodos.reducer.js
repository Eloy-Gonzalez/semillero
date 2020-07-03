import { Map } from 'immutable'

import {
  SET_PERIODOS,
  CLEAR_PERIODOS
} from './periodos.actionsTypes'

const initialState = Map().merge({
  periodos: []
})

const periodosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PERIODOS:
      return state.merge({
        periodos: payload
    })

    case CLEAR_PERIODOS:
      return state.merge({
        periodos: []
    })

    default:
      return state
  }
}

export default periodosReducer