import { Map } from 'immutable'

import {
  SET_FASES,
  CLEAR_FASES
} from './fases.actionsTypes'

const initialState = Map().merge({
  fases: {
    count: 0,
    rows: []
  }
})

const fasesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FASES:
      return state.merge({
        fases: payload
    })

    case CLEAR_FASES:
      return state.merge({
        fases: {
          count: 0,
          rows: []
        }
    })

    default:
      return state
  }
}

export default fasesReducer