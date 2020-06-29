import { Map } from 'immutable'

import {
  SET_PROYECTS,
  CLEAR_PROYECTS
} from './proyects.actionsTypes'

const initialState = Map().merge({
  proyects: {
    id_proyecto: '',
    nombre: '',
    descripcion: '',
    url_video: '',
    id_estatus: '',
    categoria: ''
  }
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
          id_proyecto: '',
          nombre: '',
          descripcion: '',
          url_video: '',
          id_estatus: '',
          categoria: ''
        }
      })

    default:
      return state
  }
}

export default proyectsReducer