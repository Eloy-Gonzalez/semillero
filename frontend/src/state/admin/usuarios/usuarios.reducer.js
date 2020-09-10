import { Map } from 'immutable'

import {
  SET_USUARIOS,
  CLEAR_USUARIOS,
  UPDATE_FILTERS
} from './usuarios.actionsTypes'

const initialState = Map().merge({
  usuarios: {
    count: 0,
    rows: []
  },
  filters: {
    page: 0,
    search: {},
    rowsPerPage: 5,
    order: 'desc',
    orderBy: 'username',
    selected: []
  },

})

const usuariosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USUARIOS:
      return state.merge({
        usuarios: payload
      })

    case CLEAR_USUARIOS:
      return state.merge({
        usuarios: {
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

export default usuariosReducer