import { Map } from 'immutable'

import {
  SET_PROYECTS,
  CLEAR_PROYECTS
} from './proyects.actionsTypes'

const initialState = Map().merge({
  proyects: []
})

const proyectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROYECTS:
      return state.merge({
        proyects: payload
      })

    case CLEAR_PROYECTS:
      return state.merge({
        proyects: []
      })

      case DELETE_PROYECT: 
      return state.merge({
        proyects: state.proyects.filter( (proyect) => proyect.id !== payload)
      })

    default:
      return state
  }
}

export default proyectsReducer