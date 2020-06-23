import { Map } from 'immutable'

import {
  SET_ONE_USER,
  SET_PROFILES,
  SET_UBICATION,
  SET_FORM_STEP
} from './users.actionsTypes'

const initialState = Map().merge({
  user: {
    isAuthenticated: false,
    username: '',
    password: ''
  },
  profiles: {
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    genero: ''
  },
  ubication: {
    telefono_habitacional: '',
    telefono_personal: '',
    direccion_habitacional: '',
    edo: '',
    mun:'',
    paq:''
  },
  registerFormStep: {
    actualVisible: 0
  }
})

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ONE_USER:
      return state.merge({
        user: payload
      })

      case SET_PROFILES:
      return state.merge({
        profiles: payload
      })

      case SET_UBICATION: 
      return state.merge({
        ubication: payload
      })

      case SET_FORM_STEP:
        return state.merge({
          registerFormStep: payload
        })

      default:
        return state
  }
}

export default authReducer