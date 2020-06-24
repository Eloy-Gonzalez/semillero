import { Map } from 'immutable'

import {
  SET_ONE_USER,
  SET_PROFILES,
  SET_UBICATION,
  SET_FORM_STEP,
  SET_REPRESENTANTE,

  // CLEANERS
  CLEAR_PROFILES,
  CLEAR_UBICATION,
  CLEAR_REPRESENTANTE
} from './users.actionsTypes'

const initialState = Map().merge({
  user: {
    isAuthenticated: false,
    username: '',
    password: ''
  },
  profiles: {
    cedula: '',
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
  },
  representant: {
    cedula_representante: '',
    segundo_nombre_representante: '',
    primer_apellido_representante: '',
    segundo_apellido_representante: '',
    genero_representante: '',
    fecha_nacimiento_representante: ''
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
    
    case SET_REPRESENTANTE:
      return state.merge({
        representant: payload
    })

    // CLEANERS
    case CLEAR_PROFILES: 
      return state.merge({
        profiles: {
          cedula: '',
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          fecha_nacimiento: '',
          genero: ''
        }
    })

    case CLEAR_UBICATION: 
      return state.merge({
        ubication: {
          telefono_habitacional: '',
          telefono_personal: '',
          direccion_habitacional: '',
          edo: '',
          mun:'',
          paq:''
        }
    })

    case CLEAR_REPRESENTANTE:
      return state.merge({
        representant:{
          cedula_representante: '',
          segundo_nombre_representante: '',
          primer_apellido_representante: '',
          segundo_apellido_representante: '',
          genero_representante: '',
          fecha_nacimiento_representante: ''
        }
      })

    default:
      return state
  }
}

export default authReducer