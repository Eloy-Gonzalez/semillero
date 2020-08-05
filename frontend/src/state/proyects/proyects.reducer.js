import { Map } from 'immutable'

import {
  SET_PROYECTS,
  CLEAR_PROYECTS,
  UPDATE_FILTERS
} from './proyects.actionsTypes'

const initialState = Map().merge({
  proyects: [],
  filters: {
    page: 0,
    search: {},
    rowsPerPage: 5,
    order: 'desc',
    orderBy: 'fecha',
    selected: []
  },
})

const proyectsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROYECTS:
      return state.merge({
        proyects: payload
      })

    case CLEAR_PROYECTS:
      return state.merge({
        proyects: {
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

export default proyectsReducer