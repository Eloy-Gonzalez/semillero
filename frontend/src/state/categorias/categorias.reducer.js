import { Map } from 'immutable'

import {
  SET_CATEGORIAS,
  CLEAR_CATEGORIAS,
  UPDATE_FILTERS
} from './categorias.actionsTypes'

const initialState = Map().merge({
  categorias: {
    count: 0,
    rows: []
  },

  filters: {
    page: 0,
    search: {},
    rowsPerPage: 5,
    order: 'asc',
    orderBy: 'nombre',
    selected: []
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

    case UPDATE_FILTERS:
      return state.merge({
        filters: {
          ...state.get('filters'),
          ...payload
        }
      })

    default:
      return state
  }
}

export default categoriasReducer