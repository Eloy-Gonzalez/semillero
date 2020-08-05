import { Map } from 'immutable'

import {
  SET_PERIODOS,
  CLEAR_PERIODOS,
  SHOW_FORM
} from './periodos.actionsTypes'

const initialState = Map().merge({
  periodos: [],
  filters: {
    page: 0,
    search: {},
    rowsPerPage: 5,
    order: 'asc',
    orderBy: 'tipo',
    selected: []
  },
  showForm: false
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

      case SHOW_FORM: 
        return state.merge({
          showForm: payload
        })

    default:
      return state
  }
}

export default periodosReducer