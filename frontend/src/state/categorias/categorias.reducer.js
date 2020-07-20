import { Map } from 'immutable'

import {
  SET_CATEGORIAS,
  CLEAR_CATEGORIAS
} from './categorias.actionsTypes'

const initialState = Map().merge({
  categorias: {
    count: 0,
    rows: []
  }
})

const categoriasReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIAS:
      return state.merge({
        categorias: payload
    })

    case CLEAR_CATEGORIAS:
      return state.merge({
      categorias: {
        count: 0,
        rows: []
      }
    })

    default:
      return state
  }
}

export default categoriasReducer